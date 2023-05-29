import React, { useState } from 'react';
import { StyleSheet, Modal, Text, TouchableOpacity, View, TextInput } from 'react-native';

type CustomModalErrorProps = {
    modalVisibleError: boolean;
    setmodalVisibleError: React.Dispatch<React.SetStateAction<boolean>>;
    errorMessage: string;
  };

type CustomModalOTPProps = {
    modalVisibleOTP: boolean;
    setModalVisibleOTP: React.Dispatch<React.SetStateAction<boolean>>;
    handleVerifyOTP: React.Dispatch<React.SetStateAction<boolean>>;
    otpMessage: string;
    otpCode: string;
    setOtpCode: React.Dispatch<React.SetStateAction<string>>;
};

type CustomModalCommentsProps = {
    modalVisibleComments: boolean;
    setmodalVisibleComments: React.Dispatch<React.SetStateAction<boolean>>;
    commentsMessage: string;
  };

const CustomModalError = ({ modalVisibleError, setmodalVisibleError, errorMessage }: CustomModalErrorProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisibleError}
      onRequestClose={() => {
        setmodalVisibleError(false);
      }}
    >
      <View style={styles.modalContainerError}>
        <View style={styles.modalContentError}>
          <Text style={styles.modalTextError}>{errorMessage}</Text>
          <TouchableOpacity onPress={() => setmodalVisibleError(false)}>
            <Text style={styles.modalButtonError}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const CustomModalOTP = ({ modalVisibleOTP, setModalVisibleOTP, handleVerifyOTP, otpCode, setOtpCode, otpMessage }: CustomModalOTPProps) => {
    console.log('CustomModalOTP otpCode: ', otpCode);
    const handleVerifyAndCloseModal = () => {
        handleVerifyOTP(prevState => !prevState);
        setModalVisibleOTP(false);
    }

    return (
      <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisibleOTP}
            onRequestClose={() => {
                setModalVisibleOTP(false);
            }}
        >
            <View style={styles.modalContainerOTP}>
                <View style={styles.modalContentOTP}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setModalVisibleOTP(false)} >
                        <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity>
                    <Text style={styles.modalTextOTP}>{otpMessage}</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputs}
                            placeholder="OTP code"
                            value={otpCode}
                            onChangeText={setOtpCode}
                            maxLength={6}
                            keyboardType={'numeric'}
                        />
                        <TouchableOpacity style={styles.buttonContainerVerify} onPress={handleVerifyAndCloseModal}>
                            <Text style={styles.buttonContainerVerifyText}>Verify OTP</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
      </Modal>
    );
};

const CustomModalComments = ({ modalVisibleComments, setmodalVisibleComments, commentsMessage }: CustomModalCommentsProps) => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleComments}
        onRequestClose={() => {
          setmodalVisibleComments(false);
        }}
      >
        <View style={styles.modalContainerComments}>
          <View style={styles.modalContentComments}>
            <Text style={styles.modalTextComments}>{commentsMessage}</Text>
            <TouchableOpacity onPress={() => setmodalVisibleComments(false)}>
              <Text style={styles.modalButtonComments}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

export { CustomModalError, CustomModalOTP, CustomModalComments };

const styles = StyleSheet.create({
    modalContainerError: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContentError: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 5,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    closeButton: {
        position: 'absolute',
        zIndex: 1,
        top: 10,
        right: 15,
    },
    closeButtonText: {
        fontSize: 20,
        color: 'black',
    },
    modalTextOTP: {
        fontSize: 14,
        textAlign: 'center',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    modalContainerOTP: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContentOTP: {
        // pop op OTP
        marginHorizontal: 30,
        backgroundColor: '#DCDCDC',
        padding: 20,
        borderRadius: 5,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    modalTextError: {
        fontSize: 16,
        marginBottom: 15,
    },
    modalButtonError: {
        color: 'blue',
        fontSize: 16,
    },
    inputContainerVerify: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        width:250,
        height:45,
        marginTop:20,
        flexDirection: 'row',
        alignItems:'center'
    },
    inputContainer:{
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        width:250,
        height:45,
        marginTop:20,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center'
    },
    inputs:{
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
    buttonContainerVerify: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 10,
    },
    buttonContainerVerifyText: {
        color: 'black',
    },
    modalContainerComments: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
    modalContentComments: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 5,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
    },
    modalTextComments: {
        fontSize: 16,
        marginBottom: 15,
    },
    modalButtonComments: {
        color: 'blue',
        fontSize: 16,
    },
});

export { styles };