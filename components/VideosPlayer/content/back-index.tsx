import React from 'react';
import { FeedItem } from '../../../store/feed';

import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { Video, ResizeMode } from 'expo-av';

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
                    resizeMode={ResizeMode.CONTAIN}
                    shouldPlay={play && isFocused}
                    isLooping
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                    onError={(error) => console.log(error)}
                    />
                </Container>
                <Details>
                    <User>{item.username}</User>
                    <Tags>{item.tags}</Tags>
                    <MusicBox>
                    <FontAwesome name="music" size={15} color="#f5f5f5" />
                    <Music>{item.music}</Music>
                    </MusicBox>
                </Details>
                <Actions>
                    <BoxAction>
                        <AntDesign
                            style={{ alignSelf: 'center' }}
                            name="heart"
                            size={35}
                            color="#fff"
                        />
                        <TextAction>{item.likes}</TextAction>
                    </BoxAction>
                    <BoxAction>
                        <FontAwesome
                            style={{ alignSelf: 'center' }}
                            name="commenting"
                            size={35}
                            color="#fff"
                        />
                        <TextAction>{item.total_comments}</TextAction>
                    </BoxAction>
                    <BoxAction>
                        <FontAwesome
                            style={{ alignSelf: 'center' }}
                            name="commenting"
                            size={35}
                            color="#fff"
                        />
                        <TextAction>{item.total_comments}</TextAction>
                        </BoxAction>
                    <BoxAction>
                        <FontAwesome
                            style={{ alignSelf: 'center' }}
                            name="whatsapp"
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