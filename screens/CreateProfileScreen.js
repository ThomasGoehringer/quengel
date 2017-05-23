import React, { Component } from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  ScrollView,
  Text,
  Button,
  TextInput,
  Keyboard
} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationActions } from 'react-navigation';
import moment from 'moment';
import databaseService from '../services/databaseService';
import { enableNotifications } from '../services/notificationService';
import { getData, setData } from '../services/storageService';
import { COLOR, FONTSIZE } from '../config/globals';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    paddingTop: 48,
    backgroundColor: COLOR.PRIMARY
  },
  headline: {
    color: '#FFFFFF',
    fontFamily: 'sans-serif-light',
    fontSize: FONTSIZE.HEADLINE,
    textAlign: 'center',
    marginBottom: 5
  },
  tabs: {
    marginBottom: 10
  },
  text: {
    color: '#FFFFFF',
    fontFamily: 'sans-serif-light',
    textAlign: 'center',
    marginBottom: 20
  },
  labelText: {
    color: '#FFFFFF',
    fontFamily: 'sans-serif-light',
    marginBottom: 8,
    marginTop: 8
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    marginVertical: 10,
    paddingVertical: 5,
    paddingHorizontal: 10
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
    backgroundColor: 'white',
    borderColor: 'white',
    flex: 1
  },
  button: {
    marginTop: 10,
    marginBottom: 20
  }
});

export default class CreateProfileScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      gender: 'male',
      dateOfBirth: moment().format('DD.MM.YYYY')
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTabPress = this.handleTabPress.bind(this);
  }

  handleSubmit() {
    getData('user').then((data) => {
      const profileData = {
        name: this.state.name,
        gender: this.state.gender,
        dateOfBirth: this.state.dateOfBirth
      };

      databaseService.createProfile(profileData, data.jwt).then(() => {
        const mergedData = Object.assign(data, profileData);
        setData('user', mergedData).then(() => {
          Keyboard.dismiss();

          // Reset the StackNavigator to MainScreen
          const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'Main' })
            ]
          });
          this.props.navigation.dispatch(resetAction);
        });
      });
    });

    // Enable Notifications by default
    enableNotifications(true);
  }

  handleTabPress(i) {
    if (i === 0) {
      this.setState({ gender: 'male' });
    } else {
      this.setState({ gender: 'female' });
    }
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <StatusBar
          backgroundColor={COLOR.PRIMARY}
          barStyle="light-content"
        />
        <Text style={styles.headline}>
          Dein kleiner quengel
        </Text>
        <Text style={styles.text}>
          Trage die wichtigsten Dinge deines quengels hier ein um danach direkt loslegen zu können.
        </Text>
        <SegmentedControlTab
          tabsContainerStyle={styles.tabs}
          tabStyle={{ borderColor: COLOR.SECONDARY }}
          activeTabStyle={{ backgroundColor: COLOR.SECONDARY }}
          values={['Junge', 'Mädchen']}
          borderRadius={0}
          selectedIndex={this.state.gender === 'male' ? 0 : 1}
          onTabPress={this.handleTabPress}
        />
        <TextInput
          style={styles.textInput}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Name"
          onChangeText={name => this.setState({ name })}
        />
        <Text style={styles.labelText}>Geburtsdatum</Text>
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
            placeholder={this.state.dateOfBirth}
            format="DD.MM.YYYY"
            minDate="01.01.2016"
            maxDate="01.01.2018"
            showIcon={false}
            customStyles={{
              dateInput: {
                borderWidth: 0
              },
              placeholderText: {
                color: COLOR.TEXT
              }
            }}
            onDateChange={dateOfBirth => this.setState({ dateOfBirth })}
          />
        </View>
        <View style={styles.button}>
          <Button
            onPress={this.handleSubmit}
            title="Fertig"
            color={COLOR.SECONDARY}
          />
        </View>
      </ScrollView>
    );
  }
}
