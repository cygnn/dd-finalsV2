import React, { useContext } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { TouchableOpacity, SafeAreaView, Image, StyleSheet, View } from 'react-native';
import { PhotoContext } from '../context/photoContext';

const PhotoPreviewSection = ({ photo, setPhoto,handleRetakePhoto, navigation }) => {

    const handleSavePhoto = ()=> {
        setPhoto(photo)
        alert('Photo saved!');
        setTimeout(() => navigation.goBack(), 200);
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.box}>
                <Image
                    style={styles.previewConatiner}
                    source={{ uri: `data:image/jpg;base64,${photo.base64}` }}
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleRetakePhoto}>
                <MaterialIcons name="delete-outline" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleSavePhoto}>
                    <FontAwesome6 name="save" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        borderRadius: 15,
        padding: 1,
        width: '95%',
        backgroundColor: 'darkgray',
        justifyContent: 'center',
        alignItems: 'center',
    },
    previewConatiner: {
        width: '95%',
        height: '85%',
        borderRadius: 15,
    },
    buttonContainer: {
        marginTop: '4%',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    },
    button: {
        backgroundColor: 'white',
        borderRadius: 25,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default PhotoPreviewSection;
