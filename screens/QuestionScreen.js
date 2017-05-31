import React, { Component } from 'react';
import {
  View,
  Picker,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  ToastAndroid
} from 'react-native';
import { LAYOUT, COLOR } from '../config/globals';
import { getData } from '../services/storageService';
import { createQuestion } from '../services/databaseService';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 15
  },
  scrollView: {
    paddingHorizontal: LAYOUT.PADDING
  },
  textInput: {
    height: 150,
    textAlignVertical: 'bottom',
    marginBottom: 10
  },
  buttonContainer: {
    paddingHorizontal: LAYOUT.PADDING
  }
});

export default class QuestionScreen extends Component {
  static navigationOptions = {
    headerTitle: 'Frage hinzufügen',
    headerRight: null,
    headerStyle: {
      backgroundColor: '#FFFFFF'
    },
    headerTintColor: 'rgb(60,60,60)'
  }

  constructor() {
    super();
    this.state = {
      category: 'food',
      text: ''
    };
  }

  handleSubmit() {
    const { goBack } = this.props.navigation;

    const question = {
      category: this.state.category,
      text: this.state.text
    };

    if (this.state.text === '') {
      ToastAndroid.show('Fragetext eingeben', ToastAndroid.SHORT);
    } else {
      getData('user')
        .then(user => createQuestion(question, user.jwt))
        .then(() => {
          // Callback to CommunityScreen
          this.props.navigation.state.params.handleEntry();
          goBack();
        });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Picker
            onValueChange={category => this.setState({ category })}
            selectedValue={this.state.category}
          >
            <Picker.Item label="Ernährung" value="food" />
            <Picker.Item label="Alltagshelfer" value="helpers" />
            <Picker.Item label="Entwicklung & Erziehung" value="development" />
            <Picker.Item label="Familie, Partnerschaft & Sex" value="family" />
            <Picker.Item label="Baby & Job" value="work" />
            <Picker.Item label="Rechtliches" value="legal" />
            <Picker.Item label="Muttiforum" value="mother" />
            <Picker.Item label="Biete / Suche" value="offerSearch" />
            <Picker.Item label="Kontakte" value="contacts" />
          </Picker>
          <TextInput
            multiline
            onChangeText={value => this.setState({ text: value })}
            placeholder="Gib deine Frage ein"
            selectionColor={COLOR.PRIMARY}
            style={styles.textInput}
            underlineColorAndroid={COLOR.SECONDARY}
          />
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button
            color={COLOR.SECONDARY}
            onPress={() => this.handleSubmit()}
            title="Bestätigen"
          />
        </View>
      </View>
    );
  }
}
