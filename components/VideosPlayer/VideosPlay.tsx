import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import PagerView from 'react-native-pager-view';

import { useIsFocused } from '@react-navigation/native';

import { Container } from './content/front-styles';
import Feed from './content/back-index';
import { respLogin, FeedData } from "../../store/login-internal";
import { FeedItem } from '../../store/feed';

type MeProp = {
    respLogin: respLogin;
}

const MyVideosPlay = ({ respLogin }: MeProp) => {
    const [profile_contents, setprofile_contents] = useState<FeedItem | any>([]);
    const [active, setActive] = useState(0);
    const isFocused = useIsFocused();
    
    useEffect(() => {
        if (respLogin?.profile_contents) {
            setprofile_contents(respLogin.profile_contents);
        }
    }, [respLogin?.profile_contents]);

    return (
        <Container>
            <PagerView
                    onPageSelected={e => {
                        setActive(e.nativeEvent.position);
                    }}
                    orientation="vertical"
                    style={{ flex: 1 }}
                    initialPage={0}
                >
                    {profile_contents.map((item: FeedItem) => (
                    <View key={item.index}>
                        <Feed item={item} play={Number(item.index) === active} isFocused={isFocused} />
                    </View>
                    ))}
            </PagerView>
        </Container>
    );
};

export { MyVideosPlay };