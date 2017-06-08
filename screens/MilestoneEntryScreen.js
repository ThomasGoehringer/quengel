import React, { Component } from 'react';
import {
  StyleSheet,
  Picker,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
  ScrollView,
  Dimensions,
  ToastAndroid
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import { COLOR, FONTSIZE, LAYOUT } from '../config/globals';
import placeholder from '../assets/images/placeholder.png';
import { getData } from '../services/storageService';
import databaseService from '../services/databaseService';


const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
    paddingBottom: 15
  },
  image: {
    height: 200,
    width,
    alignSelf: 'center'
  },
  picker: {
    color: COLOR.WHITE
  },
  pickerTitleContainer: {
    backgroundColor: COLOR.SECONDARY,
    paddingHorizontal: LAYOUT.PADDING,
    paddingBottom: 15
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    marginHorizontal: 10,
    borderColor: COLOR.WHITE
  },
  datePickerIcon: {
    color: COLOR.WHITE
  },
  datePicker: {
    flex: 1
  },
  textInput: {
    height: 80,
    textAlignVertical: 'bottom',
    marginBottom: 10
  },
  descriptionInputContainer: {
    paddingHorizontal: LAYOUT.PADDING
  },
  buttonContainer: {
    paddingHorizontal: LAYOUT.PADDING
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: COLOR.PRIMARY,
    margin: 10,
    marginBottom: 25
  }
});

export default class MilestoneEntryScreen extends Component {
  static navigationOptions = {
    headerTitle: 'Meilenstein hinzufügen',
    headerRight: null,
    headerTitleStyle: {
      color: COLOR.DARKGRAY,
      fontWeight: 'normal'
    },
    headerStyle: {
      backgroundColor: '#FFFFFF'
    },
    headerTintColor: 'rgb(60,60,60)'
  }

  constructor() {
    super();
    this.state = {
      date: '',
      imagePath: '',
      text: '',
      type: 'laugh',
      customType: '',
      height: 0
    };
  }

  componentWillMount() {
    this.setState({
      date: moment().format('DD.MM.YYYY')
    });
  }

  handleSubmit() {
    const { goBack } = this.props.navigation;

    const text = [];
    if (this.state.text !== '') {
      text.push({ value: this.state.text, createdAt: new Date() });
    }

    let customType = null;
    if (this.state.customType !== '') {
      customType = this.state.customType;
    }

    const currDate = moment();
    const date = moment(this.state.date, 'DD.MM.YYYY');
    date.hours(currDate.hours());
    date.minutes(currDate.minutes());
    date.seconds(currDate.seconds());
    date.milliseconds(currDate.milliseconds());

    const entry = {
      text,
      imagePath: this.state.imagePath,
      milestone: true,
      milestoneType: this.state.type,
      customType,
      date
    };

    if (this.state.type === 'custom' && this.state.customType === '') {
      ToastAndroid.show('Meilensteinname fehlt', ToastAndroid.SHORT);
    } else {
      getData('user')
        .then(user => databaseService.createMilestone(entry, user.jwt))
        .then(() => {
          // Callback to MilestoneScreen
          this.props.navigation.state.params.handleEntry();
          goBack();
        });
    }
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.pickerTitleContainer}>
            <Picker
              onValueChange={type => this.setState({ type })}
              selectedValue={this.state.type}
              style={styles.picker}
            >
              <Picker.Item label="Lächeln" value="laugh" />
              <Picker.Item label="Drehen" value="turn" />
              <Picker.Item label="Köpfchen halten" value="head" />
              <Picker.Item label="Greifen" value="grab" />
              <Picker.Item label="Brei" value="babyFood" />
              <Picker.Item label="Laute" value="sounds" />
              <Picker.Item label="Zahn" value="tooth" />
              <Picker.Item label="Krabbeln" value="crawl" />
              <Picker.Item label="Stehen" value="stand" />
              <Picker.Item label="Schritte" value="steps" />
              <Picker.Item label="Sitzen" value="sit" />
              <Picker.Item label="Durchschlafen" value="sleepThrough" />
              <Picker.Item label="Wort" value="word" />
              <Picker.Item label="Babysitter" value="babysitter" />
              <Picker.Item label="Reise" value="trip" />
              <Picker.Item label="Eigener Meilenstein" value="custom" />
            </Picker>
            {this.state.type === 'custom' && (
              <TextInput
                onChangeText={text => this.setState({ customType: text })}
                placeholder="Meilensteinname"
                selectionColor={COLOR.PRIMARY}
                underlineColorAndroid={COLOR.SECONDARY}
              />
            )}
            <TouchableOpacity
              style={styles.imageContainer}
              onPress={() => navigate('Camera', {
                handlePhoto: path => this.setState({ imagePath: path })
              })}
            >
              <Image
                resizeMode={this.state.imagePath !== '' ? 'cover' : 'contain'}
                style={styles.image}
                source={this.state.imagePath !== '' ? { uri: this.state.imagePath } : placeholder}
              />
            </TouchableOpacity>
            <View style={styles.datePickerContainer}>
              <Icon
                style={styles.datePickerIcon}
                name="calendar"
                size={30}
              />
              <DatePicker
                style={styles.datePicker}
                date={this.state.date}
                mode="date"
                androidMode="spinner"
                placeholder="Datum auswählen"
                format="DD.MM.YYYY"
                showIcon={false}
                customStyles={{
                  dateInput: {
                    borderWidth: 0
                  },
                  dateText: {
                    color: COLOR.WHITE
                  },
                  placeholderText: {
                    color: COLOR.WHITE
                  }
                }}
                onDateChange={date => this.setState({ date })}
              />
            </View>
          </View>
          <View style={styles.descriptionInputContainer}>
            <TextField
              multiline
              label="Notiere eure Erinnerungen"
              onChange={(event) => {
                this.setState({
                  text: event.nativeEvent.text,
                  height: event.nativeEvent.contentSize.height
                });
              }}
              selectionColor={COLOR.PRIMARY}
              textColor={COLOR.SECONDARY}
              fontSize={FONTSIZE.BODY}
              tintColor={COLOR.SECONDARY}
              baseColor={COLOR.PRIMARY}
              style={{ height: Math.max(35, this.state.height) }}
              value={this.state.text}
            />
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button
            color={COLOR.SECONDARY}
            onPress={() => this.handleSubmit()}
            style={styles.button}
            title="Bestätigen"
          />
        </View>
      </View>
    );
  }
}
