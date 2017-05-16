import React, { Component, PropTypes } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, Share } from 'react-native';
import { Card } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import Separator from 'react-native-hr';
import { COLOR } from '../config/globals';


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
    alignSelf: 'flex-end',
    marginRight: 10,
    marginBottom: 10
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

        {this.props.text.map(text =>
          <View key={text.value + text.createdAt + this.props.milestoneType + this.props.customType}>
            <View style={styles.shareTextContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textTime}>{moment(this.props.createdAt).format('DD MMM YY')}</Text>
                <Text style={styles.text}>{text.value}</Text>
              </View>
              <TouchableOpacity
                onPress={() => Share.share({ title: 'BEEP', message: 'messageboop'})}
                style={styles.shareButton}
              >
                <Icon
                  color={COLOR.SECONDARY}
                  name="share-variant"
                  size={35}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Card>
    );
  }
}
