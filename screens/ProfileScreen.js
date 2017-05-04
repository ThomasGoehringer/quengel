import React, { Component } from 'react';
import {
  Text
} from 'react-native';
import {
  Thumbnail,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Modal,
  View,
  TextInput
} from 'native-base';
import {
} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Profil extends Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false
    };
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {

    return (

      <View style={{ flex: 1 }}>
        <ListItem
          style={{
            justifyContent: 'center',
            borderBottomWidth: 0
          }}
        >
          <Text
            style={{
              textAlign: 'center'
            }}
          >
            Dein kleiner quengel!
          </Text>
        </ListItem>
        <ListItem
          style={{
            justifyContent: 'center',
            borderBottomWidth: 0
          }}
        >
          <Thumbnail
            size={100}
            source={require('../img/test.png')}
          />
        </ListItem>
        <List>
          <ListItem >
            <Left>
              <Text>Name</Text>
            </Left>
            <Body>
              <Text>Quengel</Text>
            </Body>
            <Right>
              <Icon
                onClick={renderModalFenster}
                style={{ color: '#6B6B6E' }}
                name="lead-pencil"
                size={20}
              />
            </Right>
          </ListItem>

          <ListItem >
            <Left>
              <Text>Geschlecht</Text>
            </Left>
            <Body>
              <Text>Junge</Text>
            </Body>
            <Right>
              <Icon
                name="lead-pencil"
                size={20}
              />
            </Right>
          </ListItem>
          <ListItem>
            <Left>
              <Text>Geburtstag</Text>
            </Left>
            <Body>
              <Text>2017.4.18</Text>
            </Body>
            <Right>
              <Icon
                name="lead-pencil"
                size={20}
              />
            </Right>
          </ListItem>
          <ListItem>
            <Left>
              <Text>E-Mail-Adresse</Text>
            </Left>
            <Body>
              <Text>myqbaby@guengel.de</Text>
            </Body>
            <Right>
            </Right>
          </ListItem>
        </List>
      </View>

    );
  }
}

// const BabyApp = StackNavigator({
//   ProfileName: { screen: ProfileName }
// }, { headerMode: 'screen' });
//
// AppRegistry.registerComponent('BabyApp', () => BabyApp);
