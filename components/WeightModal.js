import React, { Component } from 'react';
import { Modal, View, Text, TextInput } from 'react-native';


export default class WeightModal extends Component {
  render() {
    return (
      <Modal
        animationType={'fade'}
        transparent
        visible={this.props.visible}
        onRequestClose
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)', justifyContent: 'center' }}>
          <View style={{ marginHorizontal: 20, padding: 15, backgroundColor: 'white' }} >
            <Text>Gewicht eingeben</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                editable
                maxLength={5}
                keyboardType="numeric"
                style={{ flex: 1 }}
              />
              <Text>Gramm</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Text>ABBRECHEN</Text>
              <Text>AKZEPTIEREN</Text>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
