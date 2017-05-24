import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import moment from 'moment';
import { COLOR, FONTSIZE } from '../config/globals';


const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.SECONDARY,
    paddingTop: 10
  },
  row: {
    marginHorizontal: 50,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.PRIMARY,
    flexDirection: 'row',
    paddingVertical: 10
  },
  rowLast: {
    marginHorizontal: 50,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 20
  },
  column: {
    flex: 1,
    color: COLOR.WHITE,
    fontSize: FONTSIZE.CAPTION
  }
});

export default class Table extends Component {
  render() {
    return (
      <View style={styles.container}>
        {this.props.data.map((badge, i) =>
          <View
            style={i === this.props.data.length - 1 ? styles.rowLast : styles.row}
            key={badge.createdAt}
          >
            <Text style={styles.column}>{moment(badge.createdAt).format('DD MMMM YYYY')}</Text>
            <Text style={[styles.column, { textAlign: 'right' }]}>{`${badge.y} ${badge.unit ? badge.unit : ''}`}</Text>
          </View>
        )}
      </View>
    );
  }
}
