import React, { Component } from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  Button,
  TextInput,
  Keyboard,
  TouchableOpacity
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import databaseService from '../services/databaseService';
import { setData } from '../services/storageService';
import { COLOR } from '../config/globals';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.PRIMARY
  },
  text: {
    color: '#FFFFFF'
  }
});

export default class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordRepeat: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    if (this.state.password === this.state.passwordRepeat) {
      const user = {
        email: this.state.email,
        password: this.state.password
      };

      databaseService.register(user).then((jwt) => {
        const data = {
          email: this.state.email,
          jwt
        };

        setData('user', data).then(() => {
          Keyboard.dismiss();

          // Reset the StackNavigator to MainScreen
          const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'Main' })
            ]
          });
          this.props.navigation.dispatch(resetAction);
        });
      });
    } else {
      // TODO add error handling
      console.log('passwords dont match');
    }
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={COLOR.PRIMARY}
          barStyle="light-content"
        />
        <Text style={styles.text}>
          Deine Anmeldung
          Melde dich einfach mit deiner E-Mail Adresse und einem Passwort bei quengel an.
        </Text>
        <TextInput
          placeholder="E-Mail"
          onChangeText={email => this.setState({ email })}
        />
        <TextInput
          placeholder="Passwort"
          onChangeText={password => this.setState({ password })}
        />
        <TextInput
          placeholder="Passwort wiederholen"
          onChangeText={passwordRepeat => this.setState({ passwordRepeat })}
        />
        <Button
          onPress={this.handleSubmit}
          title="Registrieren"
          color={COLOR.PRIMARY}
        />
        <TouchableOpacity onPress={() => navigate('Login')}>
          <Text>Ich habe bereits ein Konto</Text>
        </TouchableOpacity>
      </View>
    );
  }
}