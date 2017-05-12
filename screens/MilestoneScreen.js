import React, { Component } from 'react';
import {
  View,
  Button,
  Image,
  TextInput
} from 'react-native';
import databaseService from '../services/databaseService';
import { getData } from '../services/storageService';


export default class MilestoneScreen extends Component {
  constructor() {
    super();
    this.state = {
      imagePath: '',
      text: ''
    };
  }

  handleSubmit() {
    const { goBack } = this.props.navigation;

    const entry = {
      text: this.state.text,
      imagePath: this.state.imagePath,
      milestone: true
    };

    getData('user').then((data) => {
      databaseService.createMilestone(entry, data.jwt);
    });
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View>
        <Button
          onPress={() => navigate('Camera', {
            handlePhoto: path => this.setState({ imagePath: path })
          })}
          title="Foto"
        />
        { this.state.imagePath !== '' && (
          <Image
            style={{ width: 100, height: 100 }}
            source={{ uri: this.state.imagePath }}
          />)
        }
        <TextInput
          multiline
          onChangeText={text => this.setState({ text })}
        />
        <Button
          onPress={() => this.handleSubmit()}
          title="Fertig"
        />
      </View>
    );
  }
}
