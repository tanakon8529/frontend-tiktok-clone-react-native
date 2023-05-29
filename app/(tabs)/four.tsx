import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {};

type Message = {
  id: string;
  username: string;
  imageUrl: string;
  message: string;
  timestamp: number;
};

const InboxPage: React.FC<Props> = () => {
  const [messages, setMessages] = useState<Array<Message>>([
    {
        id: '1',
        username: 'Tanakon Kabprapun',
        imageUrl: 'https://picsum.photos/50/50',
        message: 'Where did Teeravee go?',
        timestamp: Date.now(),
    },
    {
        id: '2',
        username: 'Worramate Pangjam',
        imageUrl: 'https://picsum.photos/50/50',
        message: 'Teeravee is sick.',
        timestamp: Date.now(),
    },
    {
        id: '3',
        username: 'Teeravee Lakhani',
        imageUrl: 'https://picsum.photos/50/50',
        message: 'Im in the hospital, very ill.',
        timestamp: Date.now(),
    },
  ]);

  const handleItemPress = (item: Message) => {
    // Handle message item press logic here
  };

  const renderMessageItem = ({ item }: { item: Message }) => {
    return (
      <TouchableOpacity onPress={() => handleItemPress(item)} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5 }}>
        <Image source={{ uri: item.imageUrl }} style={{ height: 50, width: 50, borderRadius: 25 }} />
        <View style={{ marginLeft: 10, flex: 1 }}>
          <Text style={{ fontWeight: 'bold', color: '#999' }}>{item.username}</Text>
          <Text style={{ color: '#997' }} numberOfLines={1} ellipsizeMode="tail">{item.message}</Text>
        </View>
        <Text style={{ color: '#999', fontSize: 12 }}>{new Date(item.timestamp).toLocaleTimeString()}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={messages}
      renderItem={renderMessageItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5 }}>
          <Icon name="search-outline" size={20} />
          <Text style={{ marginLeft: 10 }}>Search</Text>
        </View>
      }
    />
  );
};

export default InboxPage;
