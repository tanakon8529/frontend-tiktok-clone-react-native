import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import PagerView from 'react-native-pager-view';

import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Container, Header, Text_index, Tab, Separator } from '../feed/front-styles';
import Feed from '../feed/back-index';
import { fetchFeed, FeedItem } from '../../store/feed';
import { getPublicIp } from "../../store/login-internal";

export default function TabOneScreen() {
    const [feed, setFeed] = useState<FeedItem | any>([]);
    const [lastIndexFetched, setLastIndexFetched] = useState(-1);
    const [tab, setTab] = useState(1);
    const [active, setActive] = useState(0);
    const isFocused = useIsFocused();
    
    const fetchFeedData = async () => {
        const feedData = await fetchFeed();
        const newItems = (feedData?.feed || []).filter((item: FeedItem) => !feed.some((f: FeedItem) => f.index === item.index));
        setFeed((prevFeed: FeedItem[]) => [...prevFeed, ...newItems]);
        setLastIndexFetched(feed.length - 1);
        console.log("in function fetchFeedData : ", feed.length);
    };

    const onIndexChanged = (newIndex: number) => {
        console.log("onIndexChanged : ", newIndex)
        console.log("lastIndexFetched : ", lastIndexFetched)
        setActive(newIndex);
    };

    useEffect(() => {
        const getClientPublicIp = async () => {
            const client_ip = await getPublicIp()
            if (client_ip) {
                await AsyncStorage.setItem('client_ip', client_ip);
            }
        };
        
        if ((lastIndexFetched !== feed.length - 1) || (feed.length === 0)) {
            fetchFeedData();
        }
    
        getClientPublicIp();
    }, [lastIndexFetched, isFocused]);

    if (feed.length === 0) {
        return (
        <View style={styles.containerLogding}>
            <ActivityIndicator size="large" color="#3498db" />
        </View>
        );
    }

    return (
        <Container>
          <Header>
            <Tab onPress={() => setTab(1)}>
              <Text_index active={tab === 1}>Following</Text_index>
            </Tab>
            <Separator>|</Separator>
            <Tab onPress={() => setTab(2)}>
              <Text_index active={tab === 2}>For You</Text_index>
            </Tab>
          </Header>
          <PagerView
                onPageSelected={e => onIndexChanged(e.nativeEvent.position)}
                orientation="vertical"
                style={{ flex: 1 }}
                initialPage={0}
            >
                {feed.map((item: FeedItem) => (
                    <View key={item.index}>
                        <Feed item={item} play={Number(item.index) === active} isFocused={isFocused} />
                    </View>
                ))}
            </PagerView>
        </Container>
    );
};

const styles = StyleSheet.create({
    containerLogding: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});