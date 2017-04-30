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
      hydration: 0,
      diapers: 0,
      emotion: 'help'
    };
  }

  setHydration(direction) {
    console.log(direction);
    if (direction === 'up') {
      this.setState({ hydration: this.state.hydration + 1 });
    } else if (direction === 'down') {
      if (this.state.hydration > 0) {
        this.setState({ hydration: this.state.hydration - 1 });
      }
    }
  }

  setDiapers(direction) {
    console.log(direction);
    if (direction === 'up') {
      this.setState({ diapers: this.state.diapers + 1 });
    } else if (direction === 'down') {
      if (this.state.diapers > 0) {
        this.setState({ diapers: this.state.diapers - 1 });
      }
    }
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
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Icon
                onPress={() => this.setHydration('down')}
                name="chevron-left"
                size={40}
              />
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Icon
                  name="cup-water"
                  size={90}
                />
                <Text style={{ position: 'absolute', color: 'white', fontSize: 48 }}>
                  {this.state.hydration}
                </Text>
              </View>
              <Icon
                onPress={() => this.setHydration('up')}
                name="chevron-right"
                size={40}
              />
            </View>
          </View>
          <View style={{ flex: 0.5, backgroundColor: 'blue' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Icon
              onPress={() => this.setDiapers('down')}
              name="chevron-left"
              size={40}
            />
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Icon
                name="cup-water"
                size={90}
              />
              <Text style={{ position: 'absolute', color: 'white', fontSize: 48 }}>
                {this.state.diapers}
              </Text>
            </View>
            <Icon
              onPress={() => this.setDiapers('up')}
              name="chevron-right"
              size={40}
            />
          </View>
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
