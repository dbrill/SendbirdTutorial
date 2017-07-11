/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import sendbird from 'sendbird';
import Main from './src/main';
import Login from './src/components/login';

export default class SendBirdTutorial extends Component {
  constructor(props){
    super(props)
    this.state = {username: ''}
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={ styles.container }>
        <Button
            onPress={ () => navigate('Main') }
            title="Get Started!"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const SBnavigator = StackNavigator({
  Start: { screen: SendBirdTutorial },
  Main: { screen: Main },
  Login: { screen: Login }
});

AppRegistry.registerComponent('SendBirdTutorial', () => SBnavigator);
