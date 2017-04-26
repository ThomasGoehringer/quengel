import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Content, Card, CardItem, Text, Button, Icon, Left, Body, Right } from 'native-base';


export default class LogEntry extends Component {
  render() {
    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem cardBody>
              <Image style={{ resizeMode: 'cover', width: null, height: 200, flex: 1 }} source={{ uri: 'https://facebook.github.io/react/img/logo_og.png' }} />
            </CardItem>

            <CardItem style={{ paddingVertical: 0 }}>
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
        </Content>
      </Container>
    );
  }
}
