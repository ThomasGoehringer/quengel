import React, { Component } from 'react';
import {
  View,
  Text,
  Keyboard
} from 'react-native';
import { Item, Icon, Input, Button, Badge } from 'native-base';


export default class Entry extends Component {
  render() {
    const { goBack } = this.props.navigation;

    return (
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <Badge info style={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: '#FFFFFF' }}>Hydration</Text>
        </Badge>
        <Badge danger style={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: '#FFFFFF' }}>Happy</Text>
        </Badge>
        <Badge warning style={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: '#FFFFFF' }}>Quiet</Text>
        </Badge>
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
