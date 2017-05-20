import React, { Component, PropTypes } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, Share } from 'react-native';
import { Card } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import Separator from 'react-native-hr';
import { COLOR } from '../config/globals';
import { getData } from '../services/storageService';


const styles = StyleSheet.create({
  img: {
    resizeMode: 'cover',
    height: 200
  },
  shareTextContainer: {
    flexDirection: 'row'
  },
  textContainer: {
    flex: 1
  },
  text: {
    paddingTop: 0,
    paddingBottom: 15,
    paddingHorizontal: 20,
    color: 'rgb(50,50,50)'
  },
  textTime: {
    color: 'rgb(120,120,120)',
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 10
  },
  separator: {
    marginVertical: 15
  },
  shareButton: {
    alignSelf: 'flex-start',
    marginTop: 10,
    marginRight: 10
  }
});

export default class MilestoneEntry extends Component {
  getMilestoneType() {
    if (this.props.customType) {
      return this.props.customType.toUpperCase();
    }

    switch (this.props.milestoneType) {
      case 'laugh':
        return 'LÄCHELN';
      case 'turn':
        return 'DREHEN';
      case 'head':
        return 'KÖPFCHEN HALTEN';
      case 'grab':
        return 'GREIFEN';
      case 'babyFood':
        return 'BREI';
      case 'sounds':
        return 'LAUTE';
      case 'tooth':
        return 'ZAHN';
      case 'crawl':
        return 'KRABBELN';
      case 'stand':
        return 'STEHEN';
      case 'steps':
        return 'SCHRITTE';
      case 'sit':
        return 'SITZEN';
      case 'sleepThrough':
        return 'DURCHSCHLAFEN';
      case 'word':
        return 'WORT';
      case 'babysitter':
        return 'BABYSITTER';
      case 'trip':
        return 'REISE';
      case 'custom':
        return 'EIGENER MEILENSTEIN';
      default:
        return 'MEILENSTEIN';
    }
  }

  getMilestoneMessage(babyName, gender) {
    if (this.props.customType) {
      return this.props.customType.toUpperCase();
    }

    switch (this.props.milestoneType) {
      case 'laugh':
        return `Ein ganz besonderer Augenblick – ${babyName} hat heute zum ersten Mal gelächelt.`;
      case 'turn':
        return `Stark! ${babyName} hat sich heute zum ersten Mal aus eigener Kraft umgedreht.`;
      case 'head':
        return `${babyName} kann nun sein Köpfchen in Position halten, selbst drehen und beim Ziehen in die Sitzposition beugen – wichtige Voraussetzungen, um die Meilensteine Sitzen und Krabbeln zu erreichen.`;
      case 'grab':
        return `Die Welt spielend (be)greifen – ${babyName} beherrscht nun den präzisen Daumen-Zeigefinger-Griff.`;
      case 'babyFood':
        if (gender === 'male') {
          return `Yummy – ${babyName} hat heute seinen ersten Brei genossen.`;
        }
        return `Yummy – ${babyName} hat heute ihren ersten Brei genossen.`;
      case 'sounds':
        return `Wow! ${babyName} gibt nun die ersten Laute von sich.`;
      case 'tooth':
        if (gender === 'male') {
          return `${babyName} hat nun sein erstes Zähnchen. Nur noch eine Frage der Zeit, bis die restlichen nachfolgen.`;
        }
        return `${babyName} hat nun ihr erstes Zähnchen. Nur noch eine Frage der Zeit, bis die restlichen nachfolgen.`;
      case 'crawl':
        return `Von A nach B – noch etwas umständlich, aber ${babyName} bewegt sich selbstständig fort.`;
      case 'stand':
        return `Nicht mehr lange bis zum ersten Schritt – ${babyName} kann sich an Personen und Objekten hochziehen und kurze Zeit stehen.`;
      case 'steps':
        return `Ein riesen Schritt: ${babyName} kann inzwischen ein kleines Stück gehen.`;
      case 'sit':
        return `Schluss mit unkontrolliertem Umkippen – ${babyName} kann nun ohne Hilfe sitzen. `;
      case 'sleepThrough':
        if (gender === 'male') {
          return `Endlich ruhige Nächte – ${babyName} hat seine erste Nacht komplett durchgeschlafen.`;
        }
        return `Endlich ruhige Nächte – ${babyName} hat ihre erste Nacht komplett durchgeschlafen.`;
      case 'word':
        return `Hurra! Langsam aber sicher fängt ${babyName} an zu sprechen.`;
      case 'babysitter':
        return `Zeit für Mami und Papi – ${babyName} hat heute einige Stunden mit dem Babysitter verbracht.`;
      case 'trip':
        if (gender === 'male') {
          return `Urlaub! ${babyName} macht seine erste Reise.`;
        }
        return `Urlaub! ${babyName} macht ihre erste Reise.`;
      case 'custom':
        return 'EIGENER MEILENSTEIN';
      default:
        return 'MEILENSTEIN';
    }
  }

  share() {
    getData('user').then((data) => {
      const message = this.getMilestoneMessage(data.name, data.gender);
      Share.share({ message });
    });
  }

  render() {
    return (
      <Card style={this.props.text.length === 0 ? { paddingBottom: 15 } : {}}>
        <View style={styles.separator}>
          <Separator text={this.getMilestoneType()} lineColor="lightgray" />
        </View>

        {this.props.imagePath !== '' && (
          <Image
            style={styles.img}
            source={{ uri: this.props.imagePath }}
          />
        )}

        {this.props.text.length === 0 && (
          <View style={styles.shareTextContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.textTime}>{moment(this.props.createdAt).format('DD MMM YY')}</Text>
            </View>
            <TouchableOpacity
              onPress={() => this.share()}
              style={styles.shareButton}
            >
              <Icon
                color={COLOR.TEXT}
                name="share-variant"
                size={30}
              />
            </TouchableOpacity>
          </View>
        )}

        {this.props.text.map(text =>
          <View key={text.value + text.createdAt + this.props.milestoneType + this.props.customType}>
            <View style={styles.shareTextContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textTime}>{moment(this.props.createdAt).format('DD MMM YY')}</Text>
                <Text style={styles.text}>{text.value}</Text>
              </View>
              <TouchableOpacity
                onPress={() => this.share()}
                style={styles.shareButton}
              >
                <Icon
                  color={COLOR.TEXT}
                  name="share-variant"
                  size={30}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Card>
    );
  }
}
