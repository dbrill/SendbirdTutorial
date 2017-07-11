import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  ListView,
  TextInput,
  ScrollView,
} from 'react-native';

import sendbird from 'sendbird';

export default class Login extends Component {

  constructor(props){
    super(props)
    this.state = {
      message: '',
      user: 'nobody :(',
      messageList: [],
    }
  }

  componentWillMount(){
    var channelHandler = new this.props.navigation.state.params.sb.ChannelHandler();
    channelHandler.onMessageReceived = (message) => {
      this.setState({messageList: this.state.messageList.concat([message])});
     }; // Received a chat message.

     let sb = this.props.navigation.state.params.sb
     let ms = this.state.messageList
     let finalms = []
     sb.OpenChannel.getChannel('sbtutorial_channel', function(channel, error) {
        if(error) {
            console.error(error);
            return;
        }
        var messageListQuery = channel.createPreviousMessageListQuery();
        messageListQuery.load(30, true, function(messageList, error){
          if (error) {
            console.error(error);
            return;
          }
        console.log(messageList)
        this.setState({messageList: ms.concat(messageList)})
      }.bind(this));
    }.bind(this));
    // this.props.navigation.state.params.sb.addChannelHandler('handler_0', channelHandler);
    console.log(finalms)
    this.setState({messageList: this.state.messageList.concat(finalms)});
    sb.addChannelHandler('handler_0', channelHandler);
  }

  render() {
    console.log(this.state.messageList)
  var list = this.state.messageList.map((item, index) => {
    console.log(item.userID)
    console.log(item._sender.userId)
    return (
      <View
        style={styles.messageContainer}
        key={index}
        >
        <Text style={this.nameLabel}>
          {item._sender.userId}
          <Text style={styles.messageLabel}> : {item.message}</Text>
        </Text>
      </View>
    );
  });
    return(
      <View style={styles.container}>
        <View style={styles.textContainer}>
         <Text style={{color: '#000'}}> {this.state.user} </Text>
        </View>
      <Button
         style={{color: 'green'}}
         onPress={() => this._onPress()}
         title={'Send!'}
       />

        <View style={styles.chatContainer}>
        <ScrollView
          ref={(c) => this._scrollView = c}
          onScroll={this.handleScroll}
          scrollEventThrottle={16}
          onContentSizeChange={(e) => {}}
        >
        {list}
        </ScrollView>
        </View>
       <TextInput
         style={styles.input}
         value={this.state.message}
         onChangeText={(text) => this.setState({ message: text })}
         placeholder={'Enter Message'}
         maxLength={12}
         multiline={false}
         />
     </View>
    );
  }

_onPress(){
  let sb = this.props.navigation.state.params.sb
  let message = this.state.message
   //connect to channel
   let currUser = sb.getCurrentUserId();
   this.setState({user: currUser});
   sb.OpenChannel.getChannel('sbtutorial_channel', function(channel, error) {
      if(error) {
          console.error(error);
          return;
      }
      // Successfully fetched the channel.
      console.log(channel);
      console.log('Message: ' + message)
      channel.enter(function(response, error){
          if (error) {
              console.error(error);
              return;
          }
          channel.sendUserMessage(message, function(message, error){
            if (error) {
              console.error(error);
              return;
            }
          });
      });
    });
  }

}

var styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'stretch',
      backgroundColor: '#ffffff'
    },
    topContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#6E5BAA',
      paddingTop: 20,
    },
    chatContainer: {
      flex: 11,
      justifyContent: 'center',
      alignItems: 'stretch'
    },
    inputContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#6E5BAA'
    },
    textContainer: {
      flex: 1,
      justifyContent: 'center'
    },
    sendContainer: {
      justifyContent: 'flex-end',
      paddingRight: 10
    },
    sendLabel: {
      color: '#ffffff',
      fontSize: 15
    },
  });
