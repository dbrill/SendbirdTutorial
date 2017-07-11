import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
} from 'react-native';

import Login from './components/login.js';

import SendBird from 'sendbird';

export default class Main extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      sb: new SendBird({
        appId: '51CB7095-C22B-4990-AE03-16767F5AB9F0'
      }),
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <TextInput
            style={styles.input}
            value={this.state.username}
            onChangeText={(text) => this.setState({ username: text })}
            placeholder={'Enter User Nickname'}
            maxLength={12}
            multiline={false}
            />
          <TouchableHighlight
            style={styles.button}
            underlayColor={'#328FE6'}
            onPress={() => this._onPress(this.state.username)}
            >
            <Text style={styles.label}>LOGIN</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  _onPress(userName) {

    //initalize channel

    //add channel handler for reacting to messages and what not
    // var ChannelHandler = new sb.ChannelHandler();
    // ChannelHandler.onMessageReceived = function(channel, message){
    //     console.log(channel, message);
    // };
    // sb.addChannelHandler('handler_0', ChannelHandler);
    //connect to sendbird app

    //I had to assign this.state.sb to the variable newsb in order to pass it via react navigation
    //I could only reference this.state.sb the first time when making that connection and then never again
    //what's going on with the scope here?
    const { navigate } = this.props.navigation;
    let newsb = this.state.sb
    newsb.connect(userName.toLowerCase(), function(user, error) {
     if(error) {
       console.log(error);
       return;
     }
     console.log(userName.toLowerCase())
     console.log(user)
     navigate('Login', {sb: newsb})
     //connect to channel
    //  newsb.OpenChannel.getChannel('sbtutorial_channel', function(channel, error) {
    //     if(error) {
    //         console.error(error);
    //         return;
    //     }
    //     // Successfully fetched the channel.
    //     console.log(channel);
    //   });
    //     //enter into connected channel (kind of confusing)
    //     channel.enter(function(response, error){
    //         if (error) {
    //             console.error(error);
    //             return;
    //         }
    //         //queue query to participant list
    //         var participantListQuery = channel.createParticipantListQuery();
    //         //once query is received...
    //         participantListQuery.next(function (participantList, error) {
    //             if (error) {
    //               console.error(error);
    //               return;
    //             }
    //             console.log(participantList);
    //           });
    //         channel.sendUserMessage("testMessage!", function(message, error){
    //           if (error) {
    //             console.error(error);
    //             return;
    //           }
    //             // onSent
    //             console.log(message);
    //             //queue query to message list of currently connected channel
    //             var messageListQuery = channel.createPreviousMessageListQuery();
    //               //load
    //             messageListQuery.load(30, true, function(messageList, error){
    //               if (error) {
    //                   console.error(error);
    //                   return;
    //               }
    //               console.log(messageList);
    //           });
    //         });
    //     });
    // });
   });
   console.log(this.state.sb)
}
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6E5BAA'
  },
  loginContainer: {
    flex: 1,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 250,
    color: '#555555',
    padding: 10,
    height: 50,
    borderColor: '#32C5E6',
    borderWidth: 1,
    borderRadius: 4,
    alignSelf: 'center',
    backgroundColor: '#ffffff'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#328FE6',
    padding: 10,
    marginTop: 10,
    backgroundColor: '#32c5e6'
  },
  label: {
    width: 230,
    flex: 1,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff'
  },
});
