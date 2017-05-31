import React, { Component } from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  ScrollView,
  Text,
  Button,
  TextInput,
  Keyboard,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import databaseService from '../services/databaseService';
import { setData } from '../services/storageService';
import { COLOR, FONTSIZE } from '../config/globals';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    paddingTop: 48,
    backgroundColor: COLOR.PRIMARY
  },
  headline: {
    color: '#FFFFFF',
    fontFamily: 'sans-serif-light',
    fontSize: FONTSIZE.HEADLINE,
    textAlign: 'center',
    marginBottom: 5
  },
  text: {
    color: '#FFFFFF',
    fontFamily: 'sans-serif-light',
    textAlign: 'center',
    marginBottom: 20
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    marginVertical: 10,
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  button: {
    marginTop: 10,
    marginBottom: 20
  }
});

export default class RegisterScreen extends Component {
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

      if (user.email.length === 0 || user.password.length === 0) {
        ToastAndroid.show('Bitte alle Felder ausfüllen!', ToastAndroid.SHORT);
        return;
      }

      databaseService.register(user)
        .then((jwt) => {
          const data = {
            email: this.state.email,
            jwt
          };

          setData('user', data).then(() => {
            Keyboard.dismiss();
            this.props.navigation.navigate('CreateProfile');
          });
        })
        .catch(() => {
          ToastAndroid.show('Dieser Nutzer existiert bereits!', ToastAndroid.SHORT);
        });
    } else {
      ToastAndroid.show('Passwörter stimmen nich überein!', ToastAndroid.SHORT);
    }
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <StatusBar
          backgroundColor={COLOR.PRIMARY}
          barStyle="light-content"
        />
        <Text style={styles.headline}>
          Deine Registrierung
        </Text>
        <Text style={styles.text}>
          Registriere dich einfach mit deiner E-Mail Adresse und einem Passwort bei quengel.
        </Text>
        <TextInput
          style={styles.textInput}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="E-Mail"
          onChangeText={email => this.setState({ email })}
        />
        <TextInput
          style={styles.textInput}
          underlineColorAndroid="rgba(0,0,0,0)"
          secureTextEntry
          placeholder="Passwort"
          onChangeText={password => this.setState({ password })}
        />
        <TextInput
          style={styles.textInput}
          underlineColorAndroid="rgba(0,0,0,0)"
          secureTextEntry
          placeholder="Passwort wiederholen"
          onChangeText={passwordRepeat => this.setState({ passwordRepeat })}
        />
        <View style={styles.button}>
          <Button
            onPress={this.handleSubmit}
            title="Registrieren"
            color={COLOR.SECONDARY}
          />
        </View>
        <TouchableOpacity onPress={() => navigate('Login')}>
          <Text style={styles.text}>Ich habe bereits ein Konto</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
