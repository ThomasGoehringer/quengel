import React, { Component } from 'react';
import {
  View,
  Picker,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import { Icon } from 'native-base';
import Fab from 'react-native-action-button';
import SearchBar from 'react-native-material-design-searchbar'
import { COLOR } from '../config/globals';
import { getData } from '../services/storageService';
import { getQuestions, getUserQuestions } from '../services/databaseService';
import QuestionEntry from '../components/QuestionEntry';

const styles = StyleSheet.create({
  picker: {
    marginLeft: 15,
    marginRight: 28,
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
    this.setState({ loading: true });
    getData('user')
      .then((user) => {
        if (this.state.category === 'ownQuestions') {
          getUserQuestions(user.jwt)
            .then((questions) => {
              this.setState({ loading: false, questions: questions.reverse() });
            });
        } else {
          getQuestions(this.state.category, user.jwt)
            .then((questions) => {
              this.setState({ loading: false, questions: questions.reverse() });
            });
        }
      });
  }

  handleCategoryPick(category) {
    this.setState({ category });
    this.updateEntries();
  }

  renderListItem(data) {
    return (
      <QuestionEntry
        onUpdate={() => this.updateEntries()}
        navigation={this.props.navigation}
        {...data.item}
      />
    );
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
        <View style={{ backgroundColor: '#fff', elevation: 3, height: 90, flexDirection: 'column' }}>
          <View style={{ flex: 1 }}>
            <Picker
              onValueChange={category => this.handleCategoryPick(category)}
              selectedValue={this.state.category}
              style={styles.picker}
            >
              <Picker.Item label="Eigene Fragen" value="ownQuestions" />
              <Picker.Item label="Ernährung" value="food" />
              <Picker.Item label="Alltagshelfer" value="helpers" />
              <Picker.Item label="Entwicklung & Erziehung" value="development" />
              <Picker.Item label="Familie, Partnerschaft & Sex" value="family" />
              <Picker.Item label="Baby & Job" value="work" />
              <Picker.Item label="Rechtliches" value="legal" />
              <Picker.Item label="Muttiforum" value="mother" />
              <Picker.Item label="Kontakte" value="contacts" />
            </Picker>
          </View>
          <View style={{ flex: 1.5 }}>
            <SearchBar
              onSearchChange={() => console.log('On Focus')}
              height={40}
              onFocus={() => console.log('On Focus')}
              onBlur={() => console.log('On Blur')}
              placeholder={'Suchen...'}
              autoCorrect={false}
              padding={5}
              returnKeyType={'search'}
              inputStyle={{ borderWidth: 0, marginHorizontal: 8 }}
              inputProps={{
                placeholderTextColor: COLOR.LIGHTGRAY
              }}
            />
          </View>
        </View>
        <FlatList
          data={this.state.questions}
          keyExtractor={item => item._id}
          renderItem={this.renderListItem}
          ListHeaderComponent={() => <View style={{ paddingTop: 10 }} />}
          ListFooterComponent={() => <View style={{ paddingTop: 10 }} />}
          ref={(list) => { this.logList = list; }}
          refreshControl={
            <RefreshControl
              colors={[COLOR.SECONDARY]}
              refreshing={this.state.loading}
              onRefresh={() => this.updateEntries()}
            />
          }
        />
        { this.renderFab() }
      </View>
    );
  }
}
