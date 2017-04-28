import React, { Component } from 'react';
import {
  View,
  Text,
  Keyboard
} from 'react-native';
import { Item, Input, Button } from 'native-base';


export default class LogImageEntry extends Component {
  render() {
    const { goBack } = this.props.navigation;

    return (
      <View>
        <Item regular>
          <Input placeholder="Regular Textbox" />
        </Item>
        <Button
          block
          onPress={() => {
            goBack();
            Keyboard.dismiss();
          }}
        >
          <Text>Done</Text>
        </Button>
      </View>
    );
  }
}
