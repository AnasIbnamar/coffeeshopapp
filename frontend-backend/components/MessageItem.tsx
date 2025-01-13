import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { MessageInterface } from '@/types/types';
import { FontAwesome5 } from '@expo/vector-icons'; // Importing the robot icon

interface Message {
  message: MessageInterface;
}

const MessageItem = ({ message }: Message) => {
  if (message?.role === 'user') {
    return (
      <View style={styles.userMessageContainer}>
        <View style={styles.userMessageBox}>
          <View style={styles.userMessage}>
            <Text style={styles.text}>{message?.content}</Text>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.botMessageContainer}>
        <View style={styles.botMessageRow}>
          <FontAwesome5 name="robot" size={24} color="#4CAF50" style={styles.botIcon} /> {/* Robot icon */}
          <View style={styles.botMessageBox}>
            <Text style={styles.text}>{message?.content}</Text>
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  userMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 12,
    marginRight: 12,
  },
  userMessageBox: {
    width: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    padding: 12,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.8)', // Added subtle shadow effect for web
  },
  botMessageContainer: {
    width: '80%',
    marginLeft: 12,
    marginBottom: 12,
  },
  botMessageRow: {
    flexDirection: 'row',  // Align message and icon horizontally
    alignItems: 'center',  // Vertically align the icon and message
  },
  botIcon: {
    marginRight: 8,  // Space between icon and message box
  },
  botMessageBox: {
    flex: 1,
    alignSelf: 'flex-start',
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#e0e7ff',
    borderWidth: 1,
    borderColor: '#c7d2fe',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.8)', // Added subtle shadow effect for web
  },
  text: {
    fontSize: heightPercentageToDP(1.9),
  },
});

export default MessageItem;
