import { ScrollView, View, StyleSheet } from 'react-native';
import React, { useRef, useEffect } from 'react';
import MessageItem from './MessageItem';
import { MessageInterface } from '@/types/types';
import TypingIndicator from '@/components/TypingIndicator';

interface MessageListProps {
  messages: MessageInterface[];
  isTyping: boolean;
}

const MessageList = ({ messages, isTyping = false }: MessageListProps) => {
  const scrollViewRef = useRef<ScrollView | null>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <ScrollView
      ref={scrollViewRef}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {messages.map((message, index) => (
        <MessageItem key={index} message={message} />
      ))}

      {isTyping && (
        <View style={styles.typingContainer}>
          <View style={styles.typingBox}>
            <TypingIndicator />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: 10,
  },
  typingContainer: {
    width: '80%',
    marginLeft: 12,
    marginBottom: 12,
  },
  typingBox: {
    flex: 1,
    alignSelf: 'flex-start',
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#e0e7ff', // indigo-100 color
    borderWidth: 1,
    borderColor: '#c7d2fe', // indigo-200 color
  },
});

export default MessageList;
