import React, { Component } from 'react';
import {
  View,
  Button,
  TextInput
} from 'react-native';


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
