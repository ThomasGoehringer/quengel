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
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordRepeat: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    if (this.state.password === this.state.passwordRepeat) {
      const user = {
        email: this.state.email,
        password: this.state.password
      };

      databaseService.register(user).then((jwt) => {
        const data = {
          email: this.state.email,
          jwt
        };

        setData('user', data).then(() => {
          Keyboard.dismiss();
          this.props.navigation.navigate('Main');
        });
      });
    } else {
      // TODO add error handling
      console.log('passwords dont match');
    }
  }

  render() {
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
        <TextInput
          placeholder="Passwort wiederholen"
          onChangeText={passwordRepeat => this.setState({ passwordRepeat })}
        />
        <Button
          onPress={this.handleSubmit}
          title="Registrieren"
          color={COLOR.PRIMARY}
        />
      </View>
    );
  }
}
