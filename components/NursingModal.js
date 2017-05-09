import React, { Component, PropTypes } from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';
import { COLOR, FONTSIZE } from '../config/globals';
import helperService from '../services/helperService';


const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center'
  },
  container: {
    marginHorizontal: 20,
    padding: 15,
    backgroundColor: '#fff'
  },
  headline: {
    fontSize: FONTSIZE.SUBHEADING,
    fontWeight: 'bold',
    marginBottom: 15
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  timerLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  timerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonWrapper: {
    width: 35
  },
  timerLeft: {
    marginLeft: 10
  },
  timerRight: {
    marginRight: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 15
  },
  button: {
    color: COLOR.SECONDARY,
    fontWeight: 'bold',
    marginLeft: 10
  }
});

export default class NursingModal extends Component {
  static timerLeft;
  static timerRight;

  constructor() {
    super();
    this.state = {
      visible: false,
      data: 0,
      timerLeftActive: false,
      timerRightActive: false,
      secondsLeft: 0,
      secondsRight: 0
    };
  }

  componentWillMount() {
    this.setState({
      visible: this.props.visible,
      secondsLeft: this.props.data.left,
      secondsRight: this.props.data.right
    });
  }

  componentWillUnmount() {
    clearInterval(this.timerLeft);
    clearInterval(this.timerRight);
  }

  toggleLeftTimer() {
    if (this.state.timerLeftActive) {
      this.setState({ timerLeftActive: false });
      clearInterval(this.timerLeft);
    } else {
      this.setState({ timerLeftActive: true });
      this.timerLeft = setInterval(() => {
        this.setState({
          secondsLeft: this.state.secondsLeft + 1
        });
      }, 1000);
    }
  }

  toggleRightTimer() {
    if (this.state.timerRightActive) {
      this.setState({ timerRightActive: false });
      clearInterval(this.timerRight);
    } else {
      this.setState({ timerRightActive: true });
      this.timerRight = setInterval(() => {
        this.setState({
          secondsRight: this.state.secondsRight + 1
        });
      }, 1000);
    }
  }

  render() {
    return (
      <Modal
        animationType={'fade'}
        transparent
        visible={this.state.visible}
        onRequestClose={this.props.onCancel}
      >
        <View style={styles.background}>
          <View style={styles.container} >
            <Text style={styles.headline}>Stillzeit messen</Text>
            <View style={styles.timeContainer}>
              <View style={styles.timerLeftContainer}>
                <View style={styles.buttonWrapper}>
                  <Button
                    color={this.state.timerLeftActive ? COLOR.SECONDARY : COLOR.PRIMARY}
                    onPress={() => this.toggleLeftTimer()}
                    title="L"
                  />
                </View>
                <Text style={styles.timerLeft}>
                  {helperService.pad(parseInt(this.state.secondsLeft / 60, 10))}
                  :
                  {helperService.pad(this.state.secondsLeft % 60)}
                </Text>
              </View>
              <View style={styles.timerRightContainer}>
                <Text style={styles.timerRight}>
                  {helperService.pad(parseInt(this.state.secondsRight / 60, 10))}
                  :
                  {helperService.pad(this.state.secondsRight % 60)}
                </Text>
                <View style={styles.buttonWrapper}>
                  <Button
                    color={this.state.timerRightActive ? COLOR.SECONDARY : COLOR.PRIMARY}
                    onPress={() => this.toggleRightTimer()}
                    title="R"
                  />
                </View>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <Text
                onPress={this.props.onCancel}
                style={styles.button}
              >
                ABBRECHEN
              </Text>
              <Text
                onPress={() => this.props.onSubmit({
                  left: this.state.secondsLeft,
                  right: this.state.secondsRight
                })}
                style={styles.button}
              >
                AKZEPTIEREN
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

NursingModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    left: PropTypes.number,
    right: PropTypes.number
  }).isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};
