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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import { COLOR, LAYOUT } from '../config/globals';
import placeholder from '../assets/images/placeholder.png';
import { getData } from '../services/storageService';
import databaseService from '../services/databaseService';


const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 15
  },
  scrollView: {
    paddingHorizontal: LAYOUT.PADDING
  },
  image: {
    height: 200,
    width,
    alignSelf: 'center',
    marginBottom: 15
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: 'white'
  },
  datePickerIcon: {
    color: COLOR.SECONDARY,
    marginLeft: 5
  },
  datePicker: {
    flex: 1
  },
  textInput: {
    height: 80,
    textAlignVertical: 'bottom',
    marginBottom: 10
  },
  buttonContainer: {
    paddingHorizontal: LAYOUT.PADDING
  }
});

export default class MilestoneEntryScreen extends Component {
  constructor() {
    super();
    this.state = {
      date: '',
      imagePath: '',
      text: '',
      type: 'laugh',
      customType: ''
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

    const entry = {
      text,
      imagePath: this.state.imagePath,
      milestone: true,
      milestoneType: this.state.type,
      customType,
      date: moment(this.state.date, 'DD.MM.YYYY')
    };

    if (this.state.type === 'custom' && this.state.customType === '') {
      ToastAndroid.show('Meilensteinname fehlt', ToastAndroid.SHORT);
    } else {
      getData('user')
        .then(user => databaseService.createMilestone(entry, user.jwt))
        .then(() => {
          // Callback to LogScreen
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
          <Picker
            onValueChange={type => this.setState({ type })}
            selectedValue={this.state.type}
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
                placeholderText: {
                  color: COLOR.TEXT
                }
              }}
              onDateChange={date => this.setState({ date })}
            />
          </View>
          <TextInput
            multiline
            onChangeText={value => this.setState({ text: value })}
            placeholder="Notiere eure Erinnerungen"
            selectionColor={COLOR.PRIMARY}
            style={styles.textInput}
            underlineColorAndroid={COLOR.SECONDARY}
          />
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
