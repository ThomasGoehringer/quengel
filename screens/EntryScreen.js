import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  TextInput,
  Button,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import databaseService from '../services/databaseService';
import { getData } from '../services/storageService';
import WeightModal from '../components/WeightModal';
import HeightModal from '../components/HeightModal';
import HeadCircumferenceModal from '../components/HeadCircumferenceModal';
import NursingModal from '../components/NursingModal';
import { COLOR } from '../config/globals';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  componentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  componentContainerHalf: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  hydrationContainer: {
    backgroundColor: COLOR.HYDRATION
  },
  diapersContainer: {
    backgroundColor: COLOR.DIAPERS
  },
  nursingContainer: {
    backgroundColor: COLOR.NURSING
  },
  measurementsContainer: {
    backgroundColor: COLOR.MEASUREMENT
  },
  measurementContainer: {
    alignItems: 'center'
  },
  emotionsContainer: {
    backgroundColor: '#5363ab'
  },
  button: {
    alignSelf: 'center'
  }
});

export default class EntryScreen extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      badges: {
        hydration: 0,
        diapers: 0,
        weight: 0,
        height: 0,
        headCircumference: 0
      },
      emotion: 'help',
      modalVisible: false,
      activeModal: ''
    };
    this.handleModalSubmit = this.handleModalSubmit.bind(this);
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
      const badgeValue = this.state.badges[badgeKey];
      if (badgeValue === 0) return;

      let badgeUnit;

      switch (badgeKey) {
        case 'nursing':
          badgeUnit = 'min';
          break;
        case 'weight':
          badgeUnit = 'g';
          break;
        case 'height':
          badgeUnit = 'cm';
          break;
        case 'headCircumference':
          badgeUnit = 'cm';
          break;
        default:
          badgeUnit = null;
      }

      badges.push({
        badgeType: badgeKey,
        value: badgeValue,
        unit: badgeUnit,
        createdAt: currDate
      });
    });

    const emotion = this.state.emotion;
    const entryText = [];

    if (this.state.text !== '' || emotion !== 'help') {
      entryText.push({
        value: this.state.text,
        emotion: emotion === 'help' ? null : emotion,
        createdAt: currDate
      });
    }

    const entry = {
      text: entryText,
      badges,
      milestone: false
    };

    if (entry.text.length === 0 && entry.badges.length === 0) return;

    getData('user')
      .then(user => databaseService.createEntry(entry, user))
      .then(() => {
        // Callback to LogScreen
        this.props.navigation.state.params.handleEntry();
      });
  }

  handleModalSubmit(modalData) {
    switch (this.state.activeModal) {
      case 'weightModal':
        this.setState({
          badges: { ...this.state.badges, weight: modalData }
        });
        break;

      case 'heightModal':
        this.setState({
          badges: { ...this.state.badges, height: modalData }
        });
        break;

      case 'headCircumferenceModal':
        this.setState({
          badges: { ...this.state.badges, headCircumference: modalData }
        });
        break;

      default:
        break;
    }
    this.setState({
      modalVisible: false,
      activeModal: ''
    });
  }

  renderModal() {
    if (this.state.activeModal === 'weightModal') {
      return (
        <WeightModal
          data={this.state.badges.weight}
          visible={this.state.modalVisible}
          onSubmit={this.handleModalSubmit}
          onCancel={() => this.setState({
            modalVisible: false,
            activeModal: ''
          })}
        />
      );
    } else if (this.state.activeModal === 'heightModal') {
      return (
        <HeightModal
          data={this.state.badges.height}
          visible={this.state.modalVisible}
          onSubmit={this.handleModalSubmit}
          onCancel={() => this.setState({
            modalVisible: false,
            activeModal: ''
          })}
        />
      );
    } else if (this.state.activeModal === 'headCircumferenceModal') {
      return (
        <HeadCircumferenceModal
          data={this.state.badges.height}
          visible={this.state.modalVisible}
          onSubmit={this.handleModalSubmit}
          onCancel={() => this.setState({
            modalVisible: false,
            activeModal: ''
          })}
        />
      );
    } else if (this.state.activeModal === 'nursingModal') {
      return (
        <NursingModal
          data={this.state.badges.height}
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
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={[styles.componentContainerHalf, styles.hydrationContainer]}>
            <TouchableOpacity onPress={() => this.setHydration('down')}>
              <Icon
                name="chevron-left"
                size={40}
              />
            </TouchableOpacity>
            <Icon
              name="cup-water"
              size={90}
            />
            <Text style={{ position: 'absolute', color: 'white', fontSize: 48 }}>
              {this.state.badges.hydration}
            </Text>
            <TouchableOpacity onPress={() => this.setHydration('up')}>
              <Icon
                name="chevron-right"
                size={40}
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.componentContainerHalf, styles.diapersContainer]}>
            <TouchableOpacity onPress={() => this.setDiapers('down')}>
              <Icon
                name="chevron-left"
                size={40}
              />
            </TouchableOpacity>
            <Icon
              name="delete"
              size={90}
            />
            <Text style={{ position: 'absolute', color: 'white', fontSize: 48 }}>
              {this.state.badges.diapers}
            </Text>
            <TouchableOpacity onPress={() => this.setDiapers('up')}>
              <Icon
                name="chevron-right"
                size={40}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.componentContainerHalf, styles.emotionsContainer]}>
            <TouchableOpacity onPress={() => this.setEmotion('previous')}>
              <Icon
                name="chevron-left"
                size={40}
                color="#ffffff"
              />
            </TouchableOpacity>
            <Icon
              name={this.state.emotion}
              size={90}
              color="#ffffff"
            />
            <TouchableOpacity onPress={() => this.setEmotion('next')}>
              <Icon name="chevron-right" size={40} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <View style={[styles.componentContainerHalf, styles.nursingContainer]}>
            <TouchableOpacity
              onPress={() => this.setState({
                modalVisible: true,
                activeModal: 'nursingModal'
              })}
            >
              <Icon name="timer" size={90} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.componentContainer, styles.measurementsContainer]}>
            <View style={styles.measurementContainer}>
              <TouchableOpacity
                onPress={() => this.setState({
                  modalVisible: true,
                  activeModal: 'weightModal'
                })}
              >
                <Icon
                  name="scale-bathroom"
                  size={90}
                />
              </TouchableOpacity>
              {this.state.badges.weight !== 0 ?
                <Text>{this.state.badges.weight}</Text>
              : null}
            </View>
            <View style={styles.measurementContainer}>
              <TouchableOpacity
                onPress={() => this.setState({
                  modalVisible: true,
                  activeModal: 'heightModal'
                })}
              >
                <Icon
                  style={{ paddingHorizontal: 20 }}
                  name="ruler"
                  size={90}
                />
              </TouchableOpacity>
              {this.state.badges.height !== 0 ?
                <Text>{this.state.badges.height}</Text>
              : null}
            </View>
            <View style={styles.measurementContainer}>
              <TouchableOpacity
                onPress={() => this.setState({
                  modalVisible: true,
                  activeModal: 'headCircumferenceModal'
                })}
              >
                <Icon
                  name="face"
                  size={90}
                />
              </TouchableOpacity>
              {this.state.badges.headCircumference !== 0 ?
                <Text>{this.state.badges.headCircumference}</Text>
              : null}
            </View>
          </View>
        </View>
        <View elevation={8} style={{ flexDirection: 'row', backgroundColor: '#FFFFFF' }}>
          <TextInput
            style={{ flex: 1 }}
            onChangeText={text => this.setState({ text })}
            placeholder="Eintrag hinzufügen"
          />
          <Button
            title="Fertig"
            style={styles.button}
            onPress={() => {
              this.handleSubmit();
              goBack();
              Keyboard.dismiss();
            }}
          >
            <Icon name="send" />
          </Button>
        </View>
        {this.renderModal()}
      </View>
    );
  }
}
