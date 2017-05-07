import React, { Component, PropTypes } from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';
import { COLOR, FONTSIZE } from '../config/globals';


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
    fontWeight: 'bold'
  },
  timeContainer: {
    flexDirection: 'row'
  },
  sideButton: {
    padding: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10
  },
  button: {
    color: COLOR.PRIMARY,
    fontWeight: 'bold',
    marginLeft: 10
  }
});

export default class NursingModal extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      data: 0,
      selectedSide: ''
    };
  }

  componentWillMount() {
    this.setState({ visible: this.props.visible, data: this.props.data });
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
              <View>
                <Button
                  color={this.state.selectedSide === 'left' ? '#0f0' : '#aaa'}
                  onPress={() => this.setState({ selectedSide: 'left' })}
                  style={styles.sideButton}
                  title="L"
                />
              </View>
              <View>
                <Button
                  color={this.state.selectedSide === 'right' ? '#0f0' : '#aaa'}
                  onPress={() => this.setState({ selectedSide: 'right' })}
                  title="R"
                />
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
                onPress={() => this.props.onSubmit(this.state.data)}
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
  data: PropTypes.number.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};
