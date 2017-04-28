import React, { Component, PropTypes } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Card, CardItem, Text, Button, Icon, Left, Body, Right } from 'native-base';


const styles = StyleSheet.create({
  img: {
    resizeMode: 'cover',
    width: null,
    height: 200,
    flex: 1
  }
});

export default class LogImageEntry extends Component {
  render() {
    return (
      <Card>
        <CardItem cardBody>
          <Image
            style={styles.img}
            source={{ uri: this.props.uri }}
          />
        </CardItem>

        <CardItem>
          <Left>
            <Button iconLeft transparent>
              <Icon active name="thumbs-up" />
              <Text>12 Likes</Text>
            </Button>
          </Left>
          <Body>
            <Button iconLeft transparent>
              <Icon active name="chatbubbles" />
              <Text>4 Comments</Text>
            </Button>
          </Body>
          <Right>
            <Text>11h ago</Text>
          </Right>
        </CardItem>
      </Card>
    );
  }
}

LogImageEntry.propTypes = {
  uri: PropTypes.string.isRequired
};
