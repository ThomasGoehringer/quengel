import React, { Component } from 'react';
import {
  View,
  Picker,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { Icon } from 'native-base';
import Fab from 'react-native-action-button';
import { COLOR } from '../config/globals';
import { getData } from '../services/storageService';
import { getQuestions } from '../services/databaseService';
import QuestionEntry from '../components/QuestionEntry';

const styles = StyleSheet.create({
  picker: {
    marginHorizontal: 15,
    marginTop: 2
  }
});

export default class CommunityScreen extends Component {
  static navigationOptions = {
    headerTitle: 'Community',
    headerRight: null,
    headerTitleStyle: {
      fontWeight: 'normal',
      marginLeft: 15
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
    this.renderListItem = this.renderListItem.bind(this);
  }

  componentWillMount() {
    this.updateEntries();
  }

  updateEntries() {
    getData('user')
      .then((user) => {
        getQuestions(this.state.category, user.jwt)
          .then((questions) => {
            this.setState({ loading: false, questions: questions.reverse() });
          });
      });
  }

  handleCategoryPick(category) {
    this.setState({ category });
    this.updateEntries();
  }

  renderListItem(data) {
    return <QuestionEntry navigation={this.props.navigation} {...data.item} />;
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
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
          <ActivityIndicator size={50} color={COLOR.PRIMARY} />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <View style={{backgroundColor: '#fff', elevation: 3, height: 50}}>
          <Picker
            onValueChange={category => this.handleCategoryPick(category)}
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
            <Picker.Item label="Biete / Suche" value="offerSearch" />
            <Picker.Item label="Kontakte" value="contacts" />
          </Picker>
        </View>
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
