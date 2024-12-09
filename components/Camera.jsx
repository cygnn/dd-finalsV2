import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PhotoPreviewSection from './PhotoPreview';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';

export default function CameraComp() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [newPhoto, setNewPhoto] = useState(null);
  const cameraRef = useRef(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const takePic = async()=> {
    if(cameraRef.current){
      const options = {
        quality: 1,
        base64: true,
        exif: false
      };
      const takenPhoto = await cameraRef.current.takePictureAsync(options);
      setNewPhoto(takenPhoto);
    }
  };

  const handleRetakePhoto = ()=> setNewPhoto(null);

  if (newPhoto){
    return <PhotoPreviewSection photo={newPhoto} handleRetakePhoto={handleRetakePhoto}/>
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePic}>
            <Entypo name="circle" size={64} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.absol} onPress={toggleCameraFacing}>
            <Ionicons name="camera-reverse" size={32} color="black" />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    width: '100%',
    padding: 25,
  },
  absol:{
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 999,
    right: 20,
    top: 45,

  },
  button: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 9999,
    position: 'relative'
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
