import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import { Item, Input, Button } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import databaseService from '../services/databaseService';


export default class Entry extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      badges: {
        hydration: 0,
        diapers: 0
      },
      emotion: 'help'
    };
  }

  setHydration(direction) {
    if (direction === 'up') {
      this.setState({
        badges: { ...this.state.badges, hydration: this.state.badges.hydration + 1 }
      });
    } else if (direction === 'down') {
      if (this.state.badges.hydration > 0) {
        this.setState({
          badges: { ...this.state.badges, hydration: this.state.badges.hydration - 1 }
        });
      }
    }
  }

  setDiapers(direction) {
    if (direction === 'up') {
      this.setState({
        badges: { ...this.state.badges, diapers: this.state.badges.diapers + 1 }
      });
    } else if (direction === 'down') {
      if (this.state.badges.diapers > 0) {
        this.setState({
          badges: { ...this.state.badges, diapers: this.state.badges.diapers - 1 }
        });
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

  handleSubmit() {
    const currDate = new Date();

    const badges = [];

    Object.keys(this.state.badges).forEach((badgeKey) => {
      badges.push({
        badgeType: badgeKey,
        value: this.state.badges[badgeKey],
        createdAt: currDate
      });
    });

    const entry = {
      text: [{
        value: this.state.text,
        emotion: this.state.emotion,
        createdAt: currDate
      }],
      badges,
      milestone: false
    };

    databaseService.createEntry(entry);
  }

  render() {
    const { goBack } = this.props.navigation;

    return (
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 0.5, backgroundColor: '#007bff', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Icon
              onPress={() => this.setHydration('down')}
              name="chevron-left"
              size={40}
            />
            <Icon
              name="cup-water"
              size={90}
            />
            <Text style={{ position: 'absolute', color: 'white', fontSize: 48 }}>
              {this.state.badges.hydration}
            </Text>
            <Icon
              onPress={() => this.setHydration('up')}
              name="chevron-right"
              size={40}
            />
          </View>
          <View style={{ flex: 0.5, backgroundColor: '#ffac49', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Icon
              onPress={() => this.setDiapers('down')}
              name="chevron-left"
              size={40}
            />
            <Icon
              name="delete"
              size={90}
            />
            <Text style={{ position: 'absolute', color: 'white', fontSize: 48 }}>
              {this.state.badges.diapers}
            </Text>
            <Icon
              onPress={() => this.setDiapers('up')}
              name="chevron-right"
              size={40}
            />
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
          <View style={{ flex: 0.5, backgroundColor: '#c557b4' }}>
          </View>
        </View>
        <View elevation={8} style={{ backgroundColor: '#FFFFFF' }}>
          <Item regular>
            <Input
              onChangeText={text => this.setState({ text })}
              placeholder="Eintrag hinzufügen"
            />
            <Button
              transparent
              style={{ alignSelf: 'center' }}
              onPress={() => {
                this.handleSubmit();
                //goBack();
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
