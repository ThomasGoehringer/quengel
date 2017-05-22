import React, { Component, PropTypes } from 'react';
import { Modal, View, Text, TextInput, StyleSheet } from 'react-native';
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    flex: 1
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

export default class MealsModal extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      data: ''
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
        onShow={() => { this.textInput.focus(); }}
      >
        <View style={styles.background}>
          <View style={styles.container} >
            <Text style={styles.headline}>Mahlzeit hinzufügen</Text>
            <View style={styles.inputContainer}>
              <TextInput
                defaultValue={`${this.state.data}`}
                editable
                onChangeText={value => this.setState({ data: value })}
                ref={(input) => { this.textInput = input; }}
                returnKeyType="done"
                selectionColor={COLOR.PRIMARY}
                selectTextOnFocus
                style={styles.input}
                underlineColorAndroid={COLOR.SECONDARY}
              />
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

MealsModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  data: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};
