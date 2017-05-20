import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';
import Camera from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  camPreview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    margin: 20
  }
});

export default class Profile extends Component {
  static navigationOptions = {
    headerTitle: null,
    headerRight: null,
    headerStyle: {
      backgroundColor: '#FFFFFF'
    },
    headerTintColor: 'rgb(60,60,60)'
  }

  constructor() {
    super();
    this.state = {
      imagePath: ''
    };
  }

  takePicture() {
    const options = {};

    this.camera.capture({ metadata: options })
      .then((data) => {
        this.props.navigation.goBack();
        this.props.navigation.state.params.handlePhoto(data.path);
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          aspect={Camera.constants.Aspect.fill}
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.camPreview}
        >
          <TouchableOpacity onPress={() => this.takePicture()}>
            <Icon
              color="#fff"
              name="camera"
              size={50}
              style={styles.capture}
            />
          </TouchableOpacity>
        </Camera>
      </View>
    );
  }
}
