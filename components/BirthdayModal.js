import React, { Component } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


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
    alignItems: 'center',
    padding: 15
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
      visible: false,
      date: '2017-05-05'
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
              <Icon
                name="calendar"
                size={30}
              />
              <DatePicker
                style={{width: 210}}
                date={this.state.date}
                mode="date"
                placeholder="select date"
                format="DD-MM-YYYY"
                minDate="2017-01-01"
                maxDate="2017-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                    width: 0,
                    height: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }

                }}
                onDateChange={(date) => {this.setState({date: date})}}
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
