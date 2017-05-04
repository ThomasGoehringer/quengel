import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  TextInput
} from 'react-native';
import {
  Thumbnail,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Item,
  Button
} from 'native-base';
import {
} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NameModal from '../components/NameModal';
import GenderModal from '../components/GenderModal';
import BirthdayModal from '../components/BirthdayModal';
import profile from '../assets/images/test.png';

export default class Profil extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      modalVisible: false,
      activeModal: ''
    };
    this.handleModalSubmit = this.handleModalSubmit.bind(this);
  }

  handleModalSubmit(modalData) {
    console.log('handler', modalData);
    this.setState({
      modalVisible: false,
      activeModal: ''
    });
  }

  renderNameModal() {
    if (this.state.activeModal === 'NameModal') {
      return (
        <NameModal
          visible={this.state.modalVisible}
          onSubmit={this.handleModalSubmit}
          onCancel={() => this.setState({
            modalVisible: false,
            activeModal: ''
          })}
        />
      );
    }
  }

  renderGenderModal() {
    if (this.state.activeModal === 'GenderModal') {
      return (
        <GenderModal
          visible={this.state.modalVisible}
          onSubmit={this.handleModalSubmit}
          onCancel={() => this.setState({
            modalVisible: false,
            activeModal: ''
          })}
        />
      );
    }
  }

  renderBirthdayModal() {
    if (this.state.activeModal === 'BirthdayModal') {
      return (
        <BirthdayModal
          visible={this.state.modalVisible}
          onSubmit={this.handleModalSubmit}
          onCancel={() => this.setState({
            modalVisible: false,
            activeModal: ''
          })}
        />
      );
    }
  }


  render() {
    const { goBack } = this.props.navigation;

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
            source={profile}
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
              <TouchableOpacity
                onPress={() => this.setState({
                  modalVisible: true,
                  activeModal: 'NameModal'
                })}
              >
                <Icon
                  style={{ color: '#6B6B6E' }}
                  name="lead-pencil"
                  size={20}
                />
              </TouchableOpacity>
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
              <TouchableOpacity
                onPress={() => this.setState({
                  modalVisible: true,
                  activeModal: 'GenderModal'
                })}
              >
                <Icon
                  style={{ color: '#6B6B6E' }}
                  name="lead-pencil"
                  size={20}
                />
              </TouchableOpacity>
            </Right>
          </ListItem>
          <ListItem>
            <Left>
              <Text>Geburtstag</Text>
            </Left>
            <Body>
              <Text>18.04.2017</Text>
            </Body>
            <Right>
              <TouchableOpacity
                onPress={() => this.setState({
                  modalVisible: true,
                  activeModal: 'BirthdayModal'
                })}
              >
                <Icon
                  style={{ color: '#6B6B6E' }}
                  name="lead-pencil"
                  size={20}
                />
              </TouchableOpacity>
            </Right>
          </ListItem>
          <ListItem>
            <Left>
              <Text>E-Mail-Adresse</Text>
            </Left>
            <Body>
              <Text>mybaby@guengel.de</Text>
            </Body>
            <Right />
          </ListItem>
        </List>
        {this.renderNameModal()}
        {this.renderGenderModal()}
        {this.renderBirthdayModal()}
      </View>
    );
  }
}
