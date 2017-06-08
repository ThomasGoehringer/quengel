import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Button
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Swiper from 'react-native-swiper';
import screen1 from '../assets/images/screen1.png';
import screen2 from '../assets/images/screen2.png';
import screen3 from '../assets/images/screen3.png';
import { COLOR, FONTSIZE } from '../config/globals';

const styles = StyleSheet.create({
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 800,
    backgroundColor: COLOR.PRIMARY
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 800,
    backgroundColor: COLOR.DARKYELLOW
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 800,
    backgroundColor: COLOR.HELLYELLOW
  },
  textWrap: {
    marginTop: 28,
    padding: 10,
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  textTitle: {
    color: '#fff',
    fontSize: FONTSIZE.SUBHEADING
  },
  text: {
    marginTop: 8,
    textAlign: 'center',
    color: '#fff',
    fontSize: FONTSIZE.BODY
  },
  textTitleB: {
    color: COLOR.TEXT,
    fontSize: FONTSIZE.SUBHEADING
  },
  textB: {
    marginTop: 8,
    textAlign: 'center',
    color: COLOR.TEXT,
    fontSize: FONTSIZE.BODY
  },
  navButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 15
  },
  dot: {
    backgroundColor: '#000000',
    opacity: 0.3,
    width: 10,
    height: 10,
    borderRadius: 12,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 25
  },
  activeDot: {
    backgroundColor: COLOR.WHITE,
    width: 10,
    height: 10,
    borderRadius: 12,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 25
  },
  controlButtons: {
    fontSize: FONTSIZE.DISPLAY2,
    padding: 5,
    color: '#000000',
    opacity: 0.4
  }
});

export default class OnboardingScreen extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Swiper
        loop={false}
        showsButtons
        style={{
          backgroundColor: 'red'
        }}
        nextButton={
          <Text style={styles.controlButtons}>›</Text>
        }
        prevButton={
          <Text style={styles.controlButtons}>‹</Text>
        }
        dot={
          <View style={styles.dot} />
        }
        activeDot={
          <View style={styles.activeDot} />
        }
      >
        <View style={styles.slide1}>
          <Image
            style={{
              width: 270,
              height: 270
            }}
            source={screen1}
          />
          <View style={styles.textWrap}>
            <Text style={styles.textTitle}>
              Willkommen bei quengel!
            </Text>
            <Text style={styles.text}>
              Trage kinderleicht die Meilensteine und
              täglichen Momente deines kleinen Schatzes in
              quengel ein.
            </Text>
          </View>
          <TouchableOpacity
            style={styles.navButton}
            transparent
          />
        </View>
        <View style={styles.slide2}>
          <Image
            style={{
              width: 270,
              height: 270
            }}
            source={screen2}
          />
          <View style={styles.textWrap}>
            <Text style={styles.textTitleB}>
              Regelmäßigkeit ist wichtig!
            </Text>
            <Text style={styles.textB}>
              Versuche die wichtigsten Fakten zeitnah zu
              erfassen um die körperliche Entwicklung und
              Gesundheitszustand des Kindes festzuhalten.
            </Text>
          </View>
          <TouchableOpacity
            style={styles.navButton}
            transparent
          />
        </View>
        <View style={styles.slide3}>
          <Image
            style={{
              width: 270,
              height: 270
            }}
            source={screen3}
          />
          <View style={styles.textWrap}>
            <Text style={styles.textTitleB}>
              Behalte den Überblick!
            </Text>
            <Text style={styles.textB}>
              Die eingetragenen Fakten wie Schlafenszeiten oder
              Ernährung siehst du am Ende gesammelt im
              Auswertungsbereich.
            </Text>
          </View>
          <View style={styles.navButton}>
            <Button
              onPress={() => navigate('Register')}
              color={COLOR.NURSING}
              title="Jetzt loslegen!"
            />
          </View>
        </View>
      </Swiper>
    );
  }
}
