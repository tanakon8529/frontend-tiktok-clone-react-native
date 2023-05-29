import React, { useState, useEffect } from "react";
import { TouchableOpacity, Modal, View, Text } from 'react-native';
import { FeedItem } from '../../store/feed';

import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { Video, ResizeMode } from 'expo-av';

import { CustomModalComments } from "../../utils/CustomModal";

import {
    Container,
    Details,
    Actions,
    User,
    Tags,
    Music,
    MusicBox,
    BoxAction,
    TextAction,
  } from './back-styles';

interface Props {
    play: boolean;
    item: FeedItem;
    isFocused: boolean;
}
  
const Feed: React.FC<Props> = ({ play, item, isFocused }) => {
    const [modalVisibleComments, setModalVisibleComments] = useState(false);

    return (
        <>
        <LinearGradient
                colors={['rgba(0,0,0,.3)', 'transparent']}
                style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                height: '70%',
                }}
            />
                <Container>
                    <Video
                    source={{ uri: item.uri }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode={ResizeMode.COVER}
                    shouldPlay={play && isFocused}
                    isLooping
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                    onError={(error) => console.log("Feed Container Video Play : ", error)}
                    />
                </Container>
                <Details>
                    <User>{item?.username ?? 'Nobody'}</User>
                    <Tags>{item?.tags ?? 'Dedee'}</Tags>
                    <MusicBox>
                    <FontAwesome name="music" size={15} color="#f5f5f5" />
                    <Music>{item?.music ?? 'Sound Origin'}</Music>
                    </MusicBox>
                </Details>
                <Actions>
                    <BoxAction>
                        <AntDesign
                            style={{ alignSelf: 'center' }}
                            name="heart"
                            size={35}
                            color="#c0392b"
                            // color="#fff"
                        />
                        <TextAction>{item?.likes ?? '66.6k'}</TextAction>
                    </BoxAction>
                    {/* <BoxAction>
                        <FontAwesome
                            style={{ alignSelf: 'center' }}
                            name="commenting"
                            size={35}
                            color="#fff"
                        />
                        <TextAction>{item?.total_comments ?? '2'}</TextAction>
                    </BoxAction> */}
                    <BoxAction>
                        <FontAwesome
                            style={{ alignSelf: 'center' }}
                            name="commenting"
                            size={35}
                            color="#fff"
                        />
                        <TextAction>{item?.total_comments ?? '6321'}</TextAction>
                    </BoxAction>
                    <BoxAction>
                        <FontAwesome
                            style={{ alignSelf: 'center' }}
                            name="bookmark-o"
                            size={35}
                            color="#fff"
                        />
                        <TextAction>{item?.tags ?? '26.5k'}</TextAction>
                        </BoxAction>
                    <BoxAction>
                        <FontAwesome
                            style={{ alignSelf: 'center' }}
                            name="share-square-o"
                            size={35}
                            color="#06d755"
                        />
                        <TextAction>Share</TextAction>
                    </BoxAction>
                </Actions>
        <LinearGradient
            colors={['transparent', 'rgba(0,0,0,.4)']}
            style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: '50%',
            }}
        />
        </>
    );
};

export default Feed;