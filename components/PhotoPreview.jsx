import React, { useContext } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { TouchableOpacity, SafeAreaView, Image, StyleSheet, View } from 'react-native';
import { PhotoContext } from '../context/photoContext';
import save from '../assets/save.png';
import del from '../assets/delete.png';

const PhotoPreviewSection = ({ photo, setPhoto,handleRetakePhoto, navigation }) => {

    const handleSavePhoto = ()=> {
        
        setPhoto(photo)
        alert('Photo saved!');
        setTimeout(() => navigation.goBack(), 200);
    }

    console.log(photo);
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.box}>
                <Image
                    style={styles.previewConatiner}
                    source={{ uri: photo }}
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleRetakePhoto}>
                    <Image source={del} style={styles.buttonItem}/>
                </TouchableOpacity>
                <TouchableOpacity  onPress={handleSavePhoto}>
                    <Image source={save} style={styles.buttonItem}/>
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
        justifyContent: 'space-around',
        width: '100%',
    },
    button: {
        backgroundColor: 'white',
        borderRadius: 25,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonItem:{
        width:40,
        height:40,
    }
});

export default PhotoPreviewSection;
