import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import moment from 'moment';
import { COLOR } from '../config/globals';


const styles = StyleSheet.create({
  container: {
    marginHorizontal: 32
  },
  row: {
    borderBottomWidth: 1,
    borderBottomColor: COLOR.LIGHTGRAY,
    flexDirection: 'row',
    paddingVertical: 10
  },
  column: {
    flex: 1
  }
});

export default class Table extends Component {
  constructor() {
    super();
    this.state = {
      tableData: []
    };
  }

  componentWillMount() {
    const tableData = this.props.data.reverse();
    this.setState({ tableData });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.tableData.map(badge =>
          <View style={styles.row} key={badge.createdAt}>
            <Text style={styles.column}>{moment(badge.createdAt).format('DD MMM YYYY')}</Text>
            <Text style={styles.column}>{`${badge.y} ${badge.unit}`}</Text>
          </View>
        )}
      </View>
    );
  }
}
