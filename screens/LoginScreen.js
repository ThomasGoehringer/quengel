import React, { Component } from 'react';
import {
  View,
  Button,
  TextInput
} from 'react-native';
import { google } from 'react-native-simple-auth';


export default class MilestoneScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    this.handleSubmit();
  }

  handleSubmit() {
    console.log('WBASDASD');
    google({
      appId: '794879512222-plgknuup1e5r7opo9mvc3kmv629j4mh8.apps.googleusercontent.com',
      callback: 'com.on.quengel:/oauth2redirect'
    }).then((info) => {
      console.log('INFO', info);
      // info.user - user details from the provider
      // info.credentials - tokens from the provider
    }).catch((error) => {
      console.log('ERROR', error);
      // error.code
      // error.description
    });
  }

  render() {
    return (
      <View>
        <TextInput
          onChangeText={email => this.setState({ email })}
          value={this.state.text}
        />
        <TextInput
          onChangeText={password => this.setState({ password })}
          value={this.state.text}
        />
        <TextInput
          onChangeText={passwordRepeat => this.setState({ passwordRepeat })}
          value={this.state.text}
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
