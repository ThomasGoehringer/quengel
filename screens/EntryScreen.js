import React, { Component } from 'react';
import { Item, Input } from 'native-base';


export default class LogImageEntry extends Component {
  render() {
    return (
      <Item regular>
        <Input placeholder="Regular Textbox" />
      </Item>
    );
  }
}
