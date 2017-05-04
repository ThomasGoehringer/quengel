import React, { Component } from 'react';
import {
  View,
  Button,
  TextInput,
  AsyncStorage
} from 'react-native';
import databaseService from '../services/databaseService';


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
        // TODO move to a helper with async function
        const data = {
          email: this.state.email,
          jwt
        };

        AsyncStorage.setItem('user', JSON.stringify(data)).then(() => {
          this.props.navigation.navigate('Main');
        }).catch((err) => {
          console.log('ERR', err);
        });
      });
    } else {
      console.log('passwords dont match');
    }
  }

  render() {
    return (
      <View>
        <TextInput
          onChangeText={email => this.setState({ email })}
        />
        <TextInput
          onChangeText={password => this.setState({ password })}
        />
        <TextInput
          onChangeText={passwordRepeat => this.setState({ passwordRepeat })}
        />
        <Button
          onPress={this.handleSubmit}
          title="Registrieren"
          color="#841584"
        />
      </View>
    );
  }
}
