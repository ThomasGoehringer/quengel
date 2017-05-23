import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  TextInput,
  StyleSheet,
  TouchableNativeFeedback,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import databaseService from '../services/databaseService';
import { getData } from '../services/storageService';
import WeightModal from '../components/WeightModal';
import HeightModal from '../components/HeightModal';
import HeadCircumferenceModal from '../components/HeadCircumferenceModal';
import NursingModal from '../components/NursingModal';
import MealsModal from '../components/MealsModal';
import { COLOR, FONTSIZE } from '../config/globals';


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
    justifyContent: 'center',
    alignItems: 'center'
  },
  componentContainerHalf: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  horizontalComponent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  diapersContainer: {
    backgroundColor: COLOR.DIAPERS
  },
  diapersAmountText: {
    position: 'absolute',
    top: 23,
    color: COLOR.DIAPERS,
    fontSize: FONTSIZE.DISPLAY1
  },
  nursingContainer: {
    backgroundColor: COLOR.NURSING
  },
  nursingTimesContainer: {
    flexDirection: 'row'
  },
  mealsContainer: {
    backgroundColor: COLOR.MEALS
  },
  hydrationContainer: {
    backgroundColor: COLOR.HYDRATION
  },
  hydrationAmountText: {
    position: 'absolute',
    top: 26,
    color: COLOR.HYDRATION,
    fontSize: FONTSIZE.DISPLAY1
  },
  emotionsContainer: {
    backgroundColor: COLOR.EMOTION
  },
  measurementsContainer: {
    backgroundColor: COLOR.MEASUREMENT,
    justifyContent: 'space-between',
    paddingHorizontal: 30
  },
  measurementContainer: {
    alignItems: 'center'
  },
  componentText: {
    color: '#fff',
    paddingHorizontal: 4,
    fontSize: FONTSIZE.CAPTION
  },
  textInputContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF'
  },
  textInput: {
    flex: 1,
    marginHorizontal: 5
  },
  button: {
    color: COLOR.SECONDARY,
    alignSelf: 'center',
    marginRight: 10,
    fontWeight: 'bold',
    fontSize: FONTSIZE.BODY
  }
});

export default class EntryScreen extends Component {
  static navigationOptions = {
    headerTitle: null,
    headerRight: null,
    headerStyle: {
      backgroundColor: '#FFFFFF'
    },
    headerTintColor: 'rgb(60,60,60)'
  }

  constructor() {
    super();
    this.state = {
      text: '',
      badges: {
        hydration: 0,
        diapers: 0,
        weight: 0,
        height: 0,
        headCircumference: 0,
        nursingLeft: 0,
        nursingRight: 0,
        meals: ''
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
        case 'nursingLeft':
          badgeUnit = 's';
          break;
        case 'nursingRight':
          badgeUnit = 's';
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
      .then(user => databaseService.createEntry(entry, user.jwt))
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

      case 'nursingModal':
        this.setState({
          badges: {
            ...this.state.badges,
            nursingLeft: modalData.left,
            nursingRight: modalData.right
          }
        });
        break;

      case 'mealsModal':
        this.setState({
          badges: { ...this.state.badges, meals: modalData }
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
          data={{ left: this.state.badges.nursingLeft, right: this.state.badges.nursingRight }}
          visible={this.state.modalVisible}
          onSubmit={this.handleModalSubmit}
          onCancel={() => this.setState({
            modalVisible: false,
            activeModal: ''
          })}
        />
      );
    } else if (this.state.activeModal === 'mealsModal') {
      return (
        <MealsModal
          data={this.state.badges.meals}
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

    const nursingTimerLeftString = `L: ${moment.utc(this.state.badges.nursingLeft * 1000).format('mm:ss')}`;
    const nursingTimerRightString = `R: ${moment.utc(this.state.badges.nursingRight * 1000).format('mm:ss')}`;

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.row}>
            <View style={[styles.componentContainerHalf, styles.nursingContainer]}>
              <View style={styles.measurementContainer}>
                <TouchableOpacity
                  onPress={() => this.setState({
                    modalVisible: true,
                    activeModal: 'nursingModal'
                  })}
                >
                  <Icon
                    name="timer"
                    size={80}
                    color="#ffffff"
                  />
                </TouchableOpacity>
                {this.state.badges.nursingLeft === 0 && this.state.badges.nursingRight === 0 ?
                  <Text style={styles.componentText}>Stillzeit</Text>
                  : <View style={styles.nursingTimesContainer}>
                    {this.state.badges.nursingLeft !== 0 ?
                      <Text style={styles.componentText}>{nursingTimerLeftString}</Text>
                      : null}
                    {this.state.badges.nursingRight !== 0 ?
                      <Text style={styles.componentText}>{nursingTimerRightString}</Text>
                      : null}
                  </View>
                }
              </View>
            </View>
            <View style={[styles.componentContainerHalf, styles.diapersContainer]}>
              <View style={styles.horizontalComponent}>
                <TouchableOpacity onPress={() => this.setDiapers('down')}>
                  <Icon
                    name="chevron-left"
                    size={40}
                    color="#fff"
                  />
                </TouchableOpacity>
                <Icon
                  name="delete"
                  size={80}
                  color="#fff"
                />
                <Text style={styles.diapersAmountText}>
                  {this.state.badges.diapers}
                </Text>
                <TouchableOpacity onPress={() => this.setDiapers('up')}>
                  <Icon
                    name="chevron-right"
                    size={40}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.componentText}>Windeln</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={[styles.componentContainerHalf, styles.mealsContainer]}>
              <View style={styles.measurementContainer}>
                <TouchableOpacity
                  onPress={() => this.setState({
                    modalVisible: true,
                    activeModal: 'mealsModal'
                  })}
                >
                  <Icon
                    name="food-variant"
                    size={80}
                    color="#ffffff"
                  />
                </TouchableOpacity>
                <Text style={styles.componentText}>
                  {this.state.badges.meals !== '' ? `${this.state.badges.meals}` : 'Mahlzeit'}
                </Text>
              </View>
            </View>
            <View style={[styles.componentContainerHalf, styles.hydrationContainer]}>
              <View style={styles.horizontalComponent}>
                <TouchableOpacity onPress={() => this.setHydration('down')}>
                  <Icon
                    name="chevron-left"
                    size={40}
                    color="#fff"
                  />
                </TouchableOpacity>
                <Icon
                  name="cup"
                  size={80}
                  color="#fff"
                />
                <Text style={styles.hydrationAmountText}>
                  {this.state.badges.hydration}
                </Text>
                <TouchableOpacity onPress={() => this.setHydration('up')}>
                  <Icon
                    name="chevron-right"
                    size={40}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.componentText}>Fläschchen</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={[styles.componentContainer, styles.emotionsContainer]}>
              <View style={styles.horizontalComponent}>
                <TouchableOpacity onPress={() => this.setEmotion('previous')}>
                  <Icon
                    name="chevron-left"
                    size={40}
                    color="#ffffff"
                  />
                </TouchableOpacity>
                <Icon
                  name={this.state.emotion}
                  size={80}
                  color="#ffffff"
                />
                <TouchableOpacity onPress={() => this.setEmotion('next')}>
                  <Icon name="chevron-right" size={40} color="#ffffff" />
                </TouchableOpacity>
              </View>
              <Text style={styles.componentText}>Emotion</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View
              style={[
                styles.componentContainer,
                styles.horizontalComponent,
                styles.measurementsContainer
              ]}
            >
              <View style={styles.measurementContainer}>
                <TouchableOpacity
                  onPress={() => this.setState({
                    modalVisible: true,
                    activeModal: 'weightModal'
                  })}
                >
                  <Icon
                    name="scale"
                    size={80}
                    color="#ffffff"
                  />
                </TouchableOpacity>
                <Text style={styles.componentText}>
                  {this.state.badges.weight !== 0 ? `${this.state.badges.weight} g` : 'Gewicht'}
                </Text>
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
                    size={80}
                    color="#ffffff"
                  />
                </TouchableOpacity>
                <Text style={styles.componentText}>
                  {this.state.badges.height !== 0 ? `${this.state.badges.height} cm` : 'Körpergröße'}
                </Text>
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
                    size={80}
                    color="#ffffff"
                  />
                </TouchableOpacity>
                <Text style={styles.componentText}>
                  {this.state.badges.headCircumference !== 0 ? `${this.state.badges.headCircumference} cm` : 'Kopfumfang'}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <View
          elevation={8}
          style={styles.textInputContainer}
        >
          <TextInput
            onChangeText={text => this.setState({ text })}
            placeholder="Eintrag hinzufügen"
            selectionColor={COLOR.PRIMARY}
            style={styles.textInput}
            underlineColorAndroid={COLOR.SECONDARY}
          />
          <TouchableNativeFeedback>
            <Text
              style={styles.button}
              onPress={() => {
                this.handleSubmit();
                goBack();
                Keyboard.dismiss();
              }}
            >
              FERTIG
            </Text>
          </TouchableNativeFeedback>
        </View>
        {this.renderModal()}
      </View>
    );
  }
}
