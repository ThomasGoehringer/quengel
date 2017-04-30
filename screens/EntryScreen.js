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
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 0.5, backgroundColor: 'green' }}>
            <Text>Test</Text>
          </View>
          <View style={{ flex: 0.5, backgroundColor: 'blue' }}>
            <Text>Test</Text>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 0.5, backgroundColor: 'green' }}>
            <Text>Test</Text>
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
