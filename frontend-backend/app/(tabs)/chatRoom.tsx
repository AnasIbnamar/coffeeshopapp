import { Alert, TouchableOpacity, View, Text, TextInput } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import MessageList from '@/components/MessageList';
import { MessageInterface } from '@/types/types';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { callChatBotAPI } from '@/services/chatBot';
import PageHeader from '@/components/PageHeader';
import { useCart } from '@/components/CartContext';
import { StyleSheet } from 'react-native';

const ChatRoom = () => {
  const { addToCart, emptyCart } = useCart();
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const textRef = useRef('');
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {}, [messages]);

  const handleSendMessage = async () => {
    let message = textRef.current.trim();
    if (!message) return;
    try {
      // Add the user message to the list of messages
      let InputMessages = [...messages, { content: message, role: 'user' }];
      setMessages(InputMessages);
      textRef.current = '';
      if (inputRef) inputRef?.current?.clear();
      setIsTyping(true);
      let responseMessage = await callChatBotAPI(InputMessages);
      setIsTyping(false);
      setMessages([...InputMessages, responseMessage]);

      if (responseMessage?.memory?.order) {
        emptyCart();
        responseMessage.memory.order.forEach((item: any) => {
          addToCart(item.item, item.quantity);
        });
      }
    } catch (err: any) {
      Alert.alert('Message', err.message);
    }
  };

  return (
    <GestureHandlerRootView>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <PageHeader title="Chat Bot" showHeaderRight={false} bgColor="white" />
        <View style={styles.separator} />
        <View style={styles.messageContainer}>
          <MessageList messages={messages} isTyping={isTyping} />
          <View style={styles.inputContainer}>
            <View style={styles.inputBox}>
              <TextInput
                ref={inputRef}
                onChangeText={(value) => (textRef.current = value)}
                placeholder="Type your message..."
                style={styles.textInput}
              />
              <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
                <Feather name="send" size={hp(2.7)} color="#737373" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  separator: {
    height: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#D1D5DB', // neutral-300 color
  },
  messageContainer: {
    flex: 1,
    backgroundColor: '#F3F4F6', // neutral-100 color
    paddingBottom: hp(2.7), // ensures the input box isn't hidden
  },
  inputContainer: {
    marginBottom: hp(2.7),
    paddingTop: 10,
  },
  inputBox: {
    flexDirection: 'row',
    marginHorizontal: wp(3),
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#D1D5DB', // neutral-300 color
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
    elevation: 2, // Adding subtle shadow for elevation effect
  },
  textInput: {
    fontSize: hp(2),
    flex: 1,
    marginRight: 10,
    color: '#333',
  },
  sendButton: {
    backgroundColor: '#E5E7EB', // neutral-200 color
    padding: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatRoom;
