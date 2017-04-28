import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import { List, ListItem } from 'native-base';


export default class ProfileScreen extends Component {
  render() {
    const { goBack } = this.props.navigation;

    return (
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <List>
          <ListItem >
            <Text>Einstellung 1</Text>
          </ListItem>
          <ListItem>
            <Text>Einstellung 2</Text>
          </ListItem>
          <ListItem>
            <Text>Einstellung 3</Text>
          </ListItem>
        </List>
      </View>
    );
  }
}
