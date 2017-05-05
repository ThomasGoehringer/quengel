import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';
import { Thumbnail } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NameModal from '../components/NameModal';
import GenderModal from '../components/GenderModal';
import BirthdayModal from '../components/BirthdayModal';
import profile from '../assets/images/test.png';
import { COLOR } from '../config/globals';


const styles = StyleSheet.create({
  thumbnailContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 15
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 8,
    paddingLeft: 15,
    paddingRight: 15
  },
  itemText_1: {
    width: 130,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.PRIMARY
  },
  itemText_2: {
    width: 150,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.PRIMARY
  },
  labelIcon: {
    marginLeft: 15
  },
  itemIcon: {
    width: 30,
    justifyContent: 'flex-end',
    marginLeft: 15
  },
  boldFont_left: {
    justifyContent: 'flex-end',
    textAlign: 'left'
  },
  boldFont_right: {
    justifyContent: 'flex-end',
    textAlign: 'right'
  }
});

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
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.thumbnailContainer}>
          <Thumbnail
            size={100}
            style={{
              width: 100,
              height: 100,
              borderRadius: 100
            }}
            source={profile}
          />
        </View>

        <View style={styles.itemContainer}>
          <View style={styles.itemText_1}>
            <Text>Name</Text>
          </View>
          <View style={styles.itemText_2}>
            <Text>Quengel</Text>
          </View>
          <View style={styles.itemIcon}>
            <TouchableOpacity
              onPress={() => this.setState({
                modalVisible: true,
                activeModal: 'NameModal'
              })}
            >
              <Icon
                style={{ color: COLOR.PRIMARY }}
                name="lead-pencil"
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.itemContainer}>
          <View style={styles.itemText_1}>
            <Text>Geschlecht</Text>
          </View>
          <View style={styles.itemText_2}>
            <Text>Junge</Text>
          </View>
          <View style={styles.itemIcon}>
            <TouchableOpacity
              onPress={() => this.setState({
                modalVisible: true,
                activeModal: 'GenderModal'
              })}
            >
              <Icon
                style={{ color: COLOR.PRIMARY }}
                name="lead-pencil"
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.itemContainer}>
          <View style={styles.itemText_1}>
            <Text>Geburtstag</Text>
          </View>
          <View style={styles.itemText_2}>
            <Text>18.04.2017</Text>
          </View>
          <View style={styles.itemIcon}>
            <TouchableOpacity
              onPress={() => this.setState({
                modalVisible: true,
                activeModal: 'BirthdayModal'
              })}
            >
              <Icon
                style={{ color: COLOR.PRIMARY }}
                name="lead-pencil"
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.itemContainer}>
          <View

          >

            <TouchableOpacity
              onPress={() => this.setState({
                modalVisible: true
              })}
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end'
              }}
            >
              <Text
                style={{
                  paddingTop: 5
                }}
              >
                weiteres Kind
              </Text>
              <Icon
                style={{
                  color: COLOR.PRIMARY,
                  marginLeft: 15
                }}
                name="plus-circle"
                size={30}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.itemContainer}>
          <View style={styles.itemText_1}>
            <Text>Kontodaten</Text>
          </View>
          <View style={styles.itemText_2}>
          </View>
          <View style={styles.itemIcon}>
          </View>
        </View>

        <View style={styles.itemContainer}>
          <View style={styles.itemText_1}>
            <Text>E-Mail Adresse</Text>
          </View>
          <View style={styles.itemText_2}>
            <Text>mybaby@guengel.de</Text>
          </View>
          <View style={styles.itemIcon}>
          </View>
        </View>

        <View style={styles.itemContainer}>
          <View style={styles.itemText_1}>
            <Text style={styles.boldFont_left}>Konto löschen</Text>
          </View>
          <View style={styles.itemText_2}>
            <Text style={styles.boldFont_right}>Passwort ändern</Text>
          </View>
          <View style={styles.itemIcon}>
          </View>
        </View>

        <View style={styles.itemContainer}>
          <View style={styles.itemText_1}>
            <Text style={styles.boldFont_left}>Abmelden</Text>
          </View>
          <View style={styles.itemText_2}>
            <Text style={styles.boldFont_right}>Impressum</Text>
          </View>
          <View style={styles.itemIcon}>
          </View>
        </View>

        {this.renderNameModal()}
        {this.renderGenderModal()}
        {this.renderBirthdayModal()}
      </ScrollView>
    );
  }
}
