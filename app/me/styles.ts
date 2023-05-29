import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
      alignItems: 'center',
      paddingTop: 16,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    name: {
      fontSize: 24,
    },
    username: {
        fontSize: 16,
        color: '#777',
        marginTop: 4,
    },
    followContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 16,
        width: '100%',
    },
    followItem: {
        alignItems: 'center',
    },
    followNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 4,
    },
    followText: {
        fontSize: 12,
        color: '#777',
        marginTop: 4,
    },
    item: {
        margin: 4,
    },
    itemImage: {
        width: 100,
        height: 100,
    },
    itemVideo: {
        width: '100%',
        aspectRatio: 1,
        backgroundColor: 'black',
    },
    itemText: {
        fontSize: 12,
        color: '#777',
        marginTop: 4,
    },
    contentContainer: {
        paddingBottom: 16,
    },
});