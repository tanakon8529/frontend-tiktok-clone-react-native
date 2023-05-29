import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, TouchableWithoutFeedback } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { FontAwesome } from '@expo/vector-icons';
import { respLogin } from "../../store/login-internal";
import { styles } from './styles';
import { MyVideosPlay } from "../../components/VideosPlayer/VideosPlay";
import { FeedItem } from '../../store/feed';

type MeProp = {
    respLogin: respLogin;
}

const Me = ({ respLogin }: MeProp) => {
    const { profile_name, username, following, followers, likes, profile_contents } = respLogin;
    const [isProfile, setProfile] = useState<respLogin | any>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLogout, setLogout] = useState(false);

    useEffect(() => {
        setProfile(respLogin);
        setIsPlaying(false);

        // for test logout
        // setLogout(true);
    }, [profile_contents]);

    const renderItem = ({ item }: { item: FeedItem }) => {
        const handlePress = () => {
          setIsPlaying(!isPlaying);
        };
    
        return (
          <View style={styles.item}>
            {!isPlaying && (
              <TouchableWithoutFeedback onPress={handlePress}>
                <Image source={{ uri: item.uri }} style={styles.itemImage} />
              </TouchableWithoutFeedback>
            )}
            {isPlaying && (
              <MyVideosPlay respLogin={isProfile} />
            )}
          </View>
        );
    };

    const handleLogout = async () => {
        await AsyncStorage.removeItem('cookie_cache_key');
        setLogout(false);
    };

    if (isLogout) {
        handleLogout();
    }

    console.log('handleLogout: ', isLogout);
    console.log('Me respLogin display: ', profile_name);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={{ uri: respLogin.profile_url }} style={styles.avatar} />
                <Text style={styles.name}>{profile_name}</Text>
                <Text style={styles.username}>@{username}</Text>
                <View style={styles.followContainer}>
                <View style={styles.followItem}>
                    <Text style={styles.followNumber}>{followers.length}</Text>
                    <Text style={styles.followText}>Followers</Text>
                </View>
                <View style={styles.followItem}>
                    <Text style={styles.followNumber}>{following.length}</Text>
                    <Text style={styles.followText}>Following</Text>
                </View>
                <View style={styles.followItem}>
                    <FontAwesome name="heart" size={18} color="red" />
                    <Text style={styles.followNumber}>{likes}</Text>
                </View>
                </View>
            </View>
            <FlatList
                data={profile_contents as unknown as FeedItem[]}
                renderItem={renderItem}
                keyExtractor={(item) => String(item.index)}
                numColumns={3}
                contentContainerStyle={styles.contentContainer}
            />
        </View>
      );
};

export { Me };