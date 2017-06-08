import React, { Component } from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  ScrollView,
  Text,
  Button,
  TextInput,
  Keyboard,
  ToastAndroid
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import databaseService from '../services/databaseService';
import { setData } from '../services/storageService';
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
  text: {
    color: '#FFFFFF',
    fontFamily: 'sans-serif-light',
    textAlign: 'center',
    marginBottom: 20
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    marginVertical: 10,
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  button: {
    marginTop: 10,
    marginBottom: 20
  }
});

export default class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const user = {
      email: this.state.email,
      password: this.state.password
    };

    if (user.email.length === 0 || user.password.length === 0) {
      ToastAndroid.show('Bitte alle Felder ausfüllen!', ToastAndroid.SHORT);
      return;
    }

    databaseService.login(user)
      .then((jwt) => {
        databaseService.getProfile(jwt).then((profileData) => {
          if (Object.keys(profileData).length === 0) {
            // Reset the StackNavigator to MainScreen
            const resetAction = NavigationActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'CreateProfile' })
              ]
            });
            this.props.navigation.dispatch(resetAction);
            return;
          }

          const data = {
            email: this.state.email,
            jwt
          };
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
      })
      .catch(() => {
        ToastAndroid.show('Username oder Passwort ist falsch!', ToastAndroid.SHORT);
      });
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
          Deine Anmeldung
        </Text>
        <Text style={styles.text}>
          Melde dich einfach mit deiner E-Mail Adresse und einem Passwort bei quengel an.
        </Text>
        <TextInput
          style={styles.textInput}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="E-Mail"
          onChangeText={email => this.setState({ email })}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.textInput}
          underlineColorAndroid="rgba(0,0,0,0)"
          secureTextEntry
          placeholder="Passwort"
          onChangeText={password => this.setState({ password })}
        />
        <View style={styles.button}>
          <Button
            onPress={this.handleSubmit}
            title="Anmelden"
            color={COLOR.SECONDARY}
          />
        </View>
      </ScrollView>
    );
  }
}
