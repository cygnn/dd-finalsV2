import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import PhotoPreviewSection from './PhotoPreview';
import circle from '../assets/circle.png'
import cameraSwitch from '../assets/camerswitch.png'

export default function CameraComp({navigation, route}) {
  const {setPhoto} = route.params

  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [newPhoto, setNewPhoto] = useState(null);
  const cameraRef = useRef(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
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
        
        exif: false
      };
      const takenPhoto = await cameraRef.current.takePictureAsync();
      setNewPhoto(takenPhoto.uri);
    }
  };

  const handleRetakePhoto = ()=> setNewPhoto(null);

  if (newPhoto){
    return <PhotoPreviewSection photo={newPhoto} setPhoto={setPhoto} handleRetakePhoto={handleRetakePhoto} navigation={navigation}/>
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePic}>
            <Image source={circle} style={{width:80, height:80}}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.absol} onPress={toggleCameraFacing}>
            <Image source={cameraSwitch} style={{width:40, height:40}}/>
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
    borderRadius: 999,
    right: 25,
    top: 50,

  },
  button: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    
    borderRadius: 9999,
    position: 'relative'
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
