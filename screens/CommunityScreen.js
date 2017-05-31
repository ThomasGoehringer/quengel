import React, { Component } from 'react';
import {
  View,
  Picker,
  StyleSheet,
  FlatList,
  Image
} from 'react-native';
import { Icon } from 'native-base';
import Fab from 'react-native-action-button';
import { COLOR } from '../config/globals';
import { getData } from '../services/storageService';
import { getQuestions } from '../services/databaseService';
import logo from '../assets/images/logo.png';
import QuestionEntry from '../components/QuestionEntry';

const styles = StyleSheet.create({
  logo: {
    marginLeft: 15,
    justifyContent: 'center',
    width: 60,
    height: 60
  }
});

export default class CommunityScreen extends Component {
  static navigationOptions = {
    headerTitle: 'Community',
    headerLeft: <Image source={logo} style={styles.logo} />,
    headerRight: null,
    headerTitleStyle: {
      fontWeight: 'normal',
      marginLeft: 40
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
      questions: [],
      loading: true
    };
  }

  componentWillMount() {
    this.updateEntries();
  }

  updateEntries() {
    getData('user')
      .then((user) => {
        getQuestions(user.jwt)
          .then((questions) => {
            this.setState({ loading: false, questions: questions.reverse() });
          });
      });
  }

  renderListItem(data) {
    return <QuestionEntry {...data.item} />;
  }

  renderFab() {
    const { navigate } = this.props.navigation;

    return (
      <Fab
        onPress={() => {
          navigate('Question', {
            handleEntry: () => this.updateEntries()
          });
        }}
        degrees={0}
        backgroundTappable
        buttonColor={COLOR.PRIMARY}
        useNativeFeedback
      >
        <Icon name="add" />
      </Fab>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
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
        <FlatList
          style={{ paddingHorizontal: 10 }}
          data={this.state.questions}
          keyExtractor={item => item._id}
          renderItem={this.renderListItem}
          ListHeaderComponent={() => <View style={{ paddingTop: 10 }} />}
          ListFooterComponent={() => <View style={{ paddingTop: 10 }} />}
          ref={(list) => { this.logList = list; }}
        />
        { this.renderFab() }
      </View>
    );
  }
}
