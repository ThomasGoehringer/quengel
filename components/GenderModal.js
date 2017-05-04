import React, { Component } from 'react';
import { Modal, View, Text, TextInput, StyleSheet } from 'react-native';
import { Radio } from 'native-base';

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
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 0
  },
  itemText: {
    marginLeft: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  button: {
    fontWeight: 'bold',
    marginLeft: 15
  }
});

export default class GenderModal extends Component {
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
            <Text>Geschlecht eingeben</Text>
            <View style={styles.itemContainer} >
              <View style={styles.radioContainer}>
                <Radio selected={false} />
                <Text style={styles.itemText}>Junge</Text>
              </View>
              <View style={styles.radioContainer}>
                <Radio selected={true} />
                <Text style={styles.itemText}>Mädchen</Text>
              </View>
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
