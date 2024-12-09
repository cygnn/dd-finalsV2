import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { TouchableOpacity, SafeAreaView, Image, StyleSheet, View } from 'react-native';

const PhotoPreviewSection = ({ photo, handleRetakePhoto }) => {
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
