import React, { useState } from 'react';
import { Video, ResizeMode } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import { View, ActivityIndicator, Button } from 'react-native';

import { CustomModalError } from "../../utils/CustomModal";

const Post = () => {
    const [videoUri, setVideoUri] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [modalVisibleError, setModalVisibleError] = useState(false);

    const pickVideo = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            quality: 1,
            videoExportPreset: ImagePicker.VideoExportPreset.H264_100Mbps_4KUHD,
        });
      
        if (!result.canceled && result.assets.length > 0) {
          console.log("pickVideo : ", result.assets[0]);
          setVideoUri(result.assets[0].uri);
        }
    };
      
    const handleUpload = async () => {
        if (videoUri) {
            setLoading(true);
            const resp = await fetch(videoUri);
            const videoBlob = await resp.blob();
            const formData = new FormData();
            formData.append('video', videoBlob, 'video.mp4');
            // const uploadResp = await uploadVideo(formData);
            // console.log(uploadResp);
            setLoading(false);
            setIsUploading(true);
            setModalVisibleError(true);
        }
    };

    return (
        <View>
        <>
        {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
        ) : videoUri ? (
        <Video
            source={{ uri: videoUri }}
            style={{ 
                width: '70%', 
                height: '70%', 
                backgroundColor: 'black',
                alignSelf: 'center',
            }}
            resizeMode={ResizeMode.COVER}
            useNativeControls
            shouldPlay
            onError={(error) => console.log('Error:', error)}
            usePoster
            posterSource={{ uri: videoUri }}
        />
        ) : null}
        <Button title="Pick a video" onPress={pickVideo} />
        <Button title="Upload" onPress={handleUpload} />
        </>
            { isUploading && (
                <CustomModalError
                    modalVisibleError={modalVisibleError}
                    setmodalVisibleError={setModalVisibleError}
                    errorMessage={"Upload failed. Please try again."}
            />)}
        </View>
    );
};

export default Post;
