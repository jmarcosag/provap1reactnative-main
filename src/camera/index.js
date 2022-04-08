import React, { useState, useEffect, useRef } from 'react';
import { Image, Modal, StyleSheet, SafeAreaView, Text, View, TouchableOpacity} from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import styles from "../../styles";
import * as Location from 'expo-location';

export default function TakePicture(props) {
  const ref = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [hasPermissionMedia, setHasPermissionMedia] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [captured, setCaptured] = useState(null);
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');

      const { statusMedia } = await MediaLibrary.requestPermissionsAsync();
      setHasPermissionMedia(statusMedia === 'granted');

      const { statusLoc } = await Location.requestForegroundPermissionsAsync();
      if (statusLoc !== 'granted') {
        setErrorMsg('Permissão da localização negada!');
      }
    })();
  }, []);
  
  async function take() {
    saveLocation();
    if (ref) {
      const opt = {
        quality: 0.8,
        base64: true,
        flexOrientation: true,
        forceUpOrientation: true,
      }
      const data = await ref.current.takePictureAsync(opt);
      setCaptured(data.uri)
      setOpen(true)
      newName = `${props.matricula}-${props.codigo}-${props.situacao}`;
      console.log(newName);
      await MediaLibrary.saveToLibraryAsync(data.uri);
    }
  }

  async function saveLocation() {
    
    let actualLocation = await Location.getCurrentPositionAsync({});
    setLocation(actualLocation.coords);
    console.log(actualLocation.coords);
    
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera style={styles.camera} type={type} ref={ref}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonFlip}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
              <Text>Flip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonTake}
            onPress={take}>
            <Text>Take</Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <Modal transparent={true} visible={open} >
        <View style={styles.contentPhoto}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonClose} onPress={() => setOpen(false)}>
              <Text>Fechar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonClose} onPress={() => props.confirmarEnvio()}>
              <Text>Confirmar</Text>
            </TouchableOpacity>
          </View>
          <Image style={styles.img} source={{ uri: captured }} />
        </View>
      </Modal>
    </SafeAreaView>
  );
}