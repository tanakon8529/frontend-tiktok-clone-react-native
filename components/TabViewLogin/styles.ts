
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#DCDCDC',
        color: 'black',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
    },
    inputs:{
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        width:250,
        height:45,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center'
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
    inputIcon:{
        width:30,
        height:30,
        marginLeft:15,
        justifyContent: 'center'
    },
    buttonContainerSending: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 10,
    },
    buttonContainerSendingText: {
        color: 'black',
    },
    subtitleText: {
        fontSize: 14,
        textAlign: 'center',
        paddingHorizontal: 50
    },
    icon: {
        marginRight: 10,
    },
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
    modalTextError: {
        fontSize: 16,
        marginBottom: 15,
    },
    modalButtonError: {
        color: 'blue',
        fontSize: 16,
    },
});

export { styles };