import React, { Component } from 'react';
import {
  View,
  Picker,
  StyleSheet,
  ScrollView,
  Button,
  ToastAndroid
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { LAYOUT, COLOR, FONTSIZE } from '../config/globals';
import { getData } from '../services/storageService';
import { createQuestion } from '../services/databaseService';


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  pickerTitleContainer: {
    backgroundColor: COLOR.SECONDARY,
    paddingHorizontal: LAYOUT.PADDING,
    paddingBottom: 10
  },
  picker: {
    color: '#fff'
  },
  descriptionInputContainer: {
    paddingHorizontal: LAYOUT.PADDING
  },
  buttonContainer: {
    paddingHorizontal: LAYOUT.PADDING,
    marginBottom: 15
  }
});

export default class QuestionScreen extends Component {
  static navigationOptions = {
    headerTitle: 'Frage hinzufügen',
    headerRight: null,
    headerTitleStyle: {
      color: COLOR.DARKGRAY,
      fontWeight: 'normal'
    },
    headerStyle: {
      backgroundColor: '#FFFFFF'
    },
    headerTintColor: 'rgb(60,60,60)'
  }

  constructor() {
    super();
    this.state = {
      category: 'food',
      title: '',
      text: '',
      tags: [],
      height: 0
    };
  }

  componentWillMount() {
    const activeCategory = this.props.navigation.state.params.category;

    if (activeCategory !== 'ownQuestions') {
      this.setState({ category: this.props.navigation.state.params.category });
    }
  }

  handleSubmit() {
    const { goBack } = this.props.navigation;

    const question = {
      category: this.state.category,
      title: this.state.title,
      text: this.state.text
    };

    if (this.state.title === '') {
      ToastAndroid.show('Titel der Frage eingeben', ToastAndroid.SHORT);
    } else if (this.state.text === '') {
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
          <View style={styles.pickerTitleContainer}>
            <Picker
              onValueChange={category => this.setState({ category })}
              selectedValue={this.state.category}
              style={styles.picker}
            >
              <Picker.Item label="Ernährung" value="food" />
              <Picker.Item label="Alltagshelfer" value="helpers" />
              <Picker.Item label="Entwicklung & Erziehung" value="development" />
              <Picker.Item label="Familie, Partnerschaft & Sex" value="family" />
              <Picker.Item label="Baby & Job" value="work" />
              <Picker.Item label="Rechtliches" value="legal" />
              <Picker.Item label="Muttiforum" value="mother" />
              <Picker.Item label="Kontakte" value="contacts" />
            </Picker>
            <TextField
              label="Titel"
              onChangeText={value => this.setState({ title: value })}
              textColor={COLOR.WHITE}
              fontSize={FONTSIZE.HEADLINE}
              tintColor={COLOR.WHITE}
              baseColor={COLOR.PRIMARY}
              value={this.state.title}
            />
          </View>
          <View style={styles.descriptionInputContainer}>
            <TextField
              multiline
              label="Frage"
              onChange={(event) => {
                this.setState({
                  text: event.nativeEvent.text,
                  height: event.nativeEvent.contentSize.height
                });
              }}
              textColor={COLOR.SECONDARY}
              fontSize={FONTSIZE.BODY}
              tintColor={COLOR.SECONDARY}
              baseColor={COLOR.PRIMARY}
              value={this.state.text}
              style={{ height: Math.max(35, this.state.height) }}
            />
          </View>
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
