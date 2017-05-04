import React, { Component } from 'react';
import { Modal, View, Text, TextInput, StyleSheet } from 'react-native';


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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    flex: 1
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  button: {
    fontWeight: 'bold',
    marginLeft: 10
  }
});

export default class BirthdayModal extends Component {
  constructor() {
    super();
    this.state = {
      visible: false
    };
  }

  componentWillMount() {
    this.setState({ visible: this.props.visible });
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
            <Text>Geburtstag eingeben</Text>
            <View style={styles.inputContainer}>
              <TextInput
                editable
                keyboardType="numeric"
                maxLength={5}
                placeholder="TT.MM.JJJJ"
                style={styles.input}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Text
                onPress={this.props.onCancel}
                style={styles.button}>ABBRECHEN</Text>
              <Text
                onPress={() => this.props.onSubmit(123)}
                style={styles.button}
              >AKZEPTIEREN</Text>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
