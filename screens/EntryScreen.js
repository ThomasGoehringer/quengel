import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import { Item, Input, Button } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default class Entry extends Component {
  constructor() {
    super();
    this.state = {
      emotion: 'help'
    };
  }

  setEmotion(direction) {
    const emotions = ['help', 'emoticon-sad', 'emoticon-neutral', 'emoticon-happy'];
    const currEmotion = this.state.emotion;
    let newEmotion;

    if (direction === 'previous') {
      newEmotion = emotions[emotions.indexOf(currEmotion) - 1];
    } else if (direction === 'next') {
      newEmotion = emotions[emotions.indexOf(currEmotion) + 1];
    }

    if (newEmotion) {
      this.setState({ emotion: newEmotion });
    }
  }

  render() {
    const { goBack } = this.props.navigation;

    return (
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 0.5, backgroundColor: 'green' }}>
            <Text>Test</Text>
          </View>
          <View style={{ flex: 0.5, backgroundColor: 'blue' }}>
            <Text>Test</Text>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 0.5, flexDirection: 'row', backgroundColor: '#5363ab', alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => this.setEmotion('previous')}>
              <Icon name="chevron-left" size={40} color="#ffffff" />
            </TouchableOpacity>
            <Icon name={this.state.emotion} size={90} color="#ffffff" />
            <TouchableOpacity onPress={() => this.setEmotion('next')}>
              <Icon name="chevron-right" size={40} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 0.5, backgroundColor: 'blue' }}>
            <Text>Test</Text>
          </View>
        </View>
        <View elevation={8} style={{ backgroundColor: '#FFFFFF' }}>
          <Item regular>
            <Input
              placeholder="Eintrag hinzufügen"
            />
            <Button
              transparent
              style={{ alignSelf: 'center' }}
              onPress={() => {
                goBack();
                Keyboard.dismiss();
              }}
            >
              <Icon name="send" />
            </Button>
          </Item>
        </View>
      </View>
    );
  }
}
