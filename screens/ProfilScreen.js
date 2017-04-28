import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import { Item, Icon, Input, Button, Badge, List, ListItem, Right, Switch } from 'native-base';


export default class Profil extends Component {
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
