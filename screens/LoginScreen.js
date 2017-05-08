import React, { Component } from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  Button,
  TextInput,
  Keyboard
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import databaseService from '../services/databaseService';
import { setData } from '../services/storageService';
import { COLOR } from '../config/globals';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.PRIMARY
  },
  text: {
    color: '#FFFFFF'
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

    databaseService.login(user).then((jwt) => {
      const data = {
        email: this.state.email,
        jwt
      };

      setData('user', data).then(() => {
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
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={COLOR.PRIMARY}
          barStyle="light-content"
        />
        <Text style={styles.text}>
          Deine Anmeldung
          Melde dich einfach mit deiner E-Mail Adresse und einem Passwort bei quengel an.
        </Text>
        <TextInput
          placeholder="E-Mail"
          onChangeText={email => this.setState({ email })}
        />
        <TextInput
          placeholder="Passwort"
          onChangeText={password => this.setState({ password })}
        />
        <Button
          onPress={this.handleSubmit}
          title="Login"
          color={COLOR.PRIMARY}
        />
      </View>
    );
  }
}
