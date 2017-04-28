import React, { Component } from 'react';
import {
  View,
  Text,
  Keyboard
} from 'react-native';
import { Item, Icon, Input, Button } from 'native-base';


export default class Entry extends Component {
  render() {
    const { goBack } = this.props.navigation;

    return (
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <Text>Platz fuer Badges</Text>
        <View elevation={8} style={{ backgroundColor: '#FFFFFF' }}>
          <Item regular>
            <Input
              placeholder="Eintrag hinzufügen"
              autoFocus
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
