import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ChatScreen = ({ navigation, route }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Lorem ipsum dolor is amet, consectetur adipiscing elit, sed do eiusmod.',
      sender: 'driver',
      timestamp: '08:04 pm',
    },
    {
      id: '2',
      text: 'Lorem ipsum dolor is amet, consectetur adipiscing elit, sed do eiusmod.',
      sender: 'user',
      timestamp: '08:04 pm',
    },
    {
      id: '3',
      text: 'Lorem ipsum dolor is amet, consectetur adipiscing elit, sed do eiusmod.',
      sender: 'driver',
      timestamp: '08:04 pm',
    },
    {
      id: '4',
      isVoice: true,
      duration: '0:13',
      sender: 'user',
      timestamp: '08:04 pm',
    },
    {
      id: '5',
      text: 'Lorem ipsum dolor is amet, consectetur adipiscing elit, sed do eiusmod.',
      sender: 'user',
      timestamp: '08:04 pm',
    },
  ]);

  const flatListRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        id: String(messages.length + 1),
        text: message,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }).toLowerCase(),
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const renderMessage = ({ item }) => {
    const isUser = item.sender === 'user';

    if (item.isVoice) {
      return (
        <View
          style={[
            styles.messageContainer,
            isUser ? styles.userMessage : styles.driverMessage,
          ]}
        >
          <View style={styles.voiceMessageContent}>
            <TouchableOpacity>
              <Ionicons name="play" size={24} color={isUser ? '#fff' : '#000'} />
            </TouchableOpacity>
            <View style={styles.voiceWaveform}>
              {/* Render waveform visualization here */}
              <View style={[styles.waveform, isUser && styles.userWaveform]} />
            </View>
            <Text style={[styles.duration, isUser && styles.userDuration]}>
              {item.duration}
            </Text>
          </View>
          <Text style={[styles.timestamp, isUser && styles.userTimestamp]}>
            {item.timestamp}
          </Text>
        </View>
      );
    }

    return (
      <View
        style={[
          styles.messageContainer,
          isUser ? styles.userMessage : styles.driverMessage,
        ]}
      >
        <Text style={[styles.messageText, isUser && styles.userMessageText]}>
          {item.text}
        </Text>
        <Text style={[styles.timestamp, isUser && styles.userTimestamp]}>
          {item.timestamp}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Image
          source={require('../../assets/driver-avatar.png')}
          style={styles.avatar}
        />
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>Jenny Wilson</Text>
          <Text style={styles.headerStatus}>Online</Text>
        </View>
        <TouchableOpacity style={styles.callButton}>
          <Ionicons name="call" size={24} color="#FFB800" />
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />
      
      <Text style={styles.dateHeader}>TODAY</Text>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        style={styles.inputContainer}
      >
        <View style={styles.inputWrapper}>
          {!isRecording ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Type a message here..."
                value={message}
                onChangeText={setMessage}
                multiline
              />
              {message.trim() ? (
                <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                  <Ionicons name="send" size={24} color="#FFB800" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.micButton}
                  onPress={() => setIsRecording(true)}
                >
                  <Ionicons name="mic" size={24} color="#FFB800" />
                </TouchableOpacity>
              )}
            </>
          ) : (
            <View style={styles.recordingContainer}>
              <Text style={styles.recordingText}>Recording...</Text>
              <TouchableOpacity
                style={styles.stopButton}
                onPress={() => setIsRecording(false)}
              >
                <Ionicons name="stop" size={24} color="#FFB800" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    padding: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 8,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  headerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerStatus: {
    fontSize: 14,
    color: '#666',
  },
  callButton: {
    padding: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
  },
  dateHeader: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    marginVertical: 16,
  },
  messagesList: {
    padding: 16,
  },
  messageContainer: {
    maxWidth: '80%',
    marginBottom: 16,
    padding: 12,
    borderRadius: 12,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#FFB800',
  },
  driverMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f5f5f5',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  userMessageText: {
    color: '#fff',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  userTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  voiceMessageContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voiceWaveform: {
    flex: 1,
    marginHorizontal: 8,
  },
  waveform: {
    height: 24,
    backgroundColor: '#ddd',
    borderRadius: 12,
  },
  userWaveform: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  duration: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
  },
  userDuration: {
    color: '#fff',
  },
  inputContainer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    padding: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 12,
    padding: 8,
  },
  micButton: {
    marginLeft: 12,
    padding: 8,
  },
  recordingContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  recordingText: {
    flex: 1,
    fontSize: 16,
    color: '#666',
  },
  stopButton: {
    padding: 8,
  },
});

export default ChatScreen; 