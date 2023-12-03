import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { Entypo } from "@expo/vector-icons";
import * as tf from "@tensorflow/tfjs";
import * as bodyPix from "@tensorflow-models/body-pix";

// import { Camera, useCameraDevices } from "react-native-vision-camera";
import * as MediaLibrary from "expo-media-library";
import { Camera, CameraType } from "expo-camera";

export default function CameraScreen() {
  // const devices = useCameraDevices();
  // const device = devices.back;
  const [showCamera, setShowCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);
  const canvasRef = useRef(null);

  const loadBodyPix = async () => {
    try {
      const net = await bodyPix.load();
      console.log("Loaded");
    } catch (e) {
      console.error(e.message);
    }
  };

  loadBodyPix();

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setShowCamera(cameraStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        setImage(data.uri);
      } catch (e) {
        console.log(e);
      }
    }
  };

  if (!showCamera) {
    return (
      <View className="justify-center flex-1 bg-[#fff]">
        <Text className="text-center">Permission Not provided</Text>
      </View>
    );
  } else {
    return (
      <View className="justify-center flex-1 bg-[#fff]">
        {image ? (
          <Image source={{ uri: image }} className="flex-[0.8]" />
        ) : (
          <Camera
            ref={cameraRef}
            type={type}
            flashMode={flash}
            className="flex-[0.8]"
          />
        )}
        {image ? (
          <View className="flex flex-row justify-between">
            <TouchableOpacity className="h-[40px] flex-row items-center justify-center mt-20 rounded-full bg-[#F97316] w-20 mx-auto">
              <Entypo name="check" size={32} onPress={() => setImage(null)} />
            </TouchableOpacity>
            <TouchableOpacity className="h-[40px] flex-row items-center justify-center mt-20 rounded-full bg-[#F97316] w-20 mx-auto">
              <Entypo name="retweet" size={32} onPress={() => setImage(null)} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity className="h-[40px] flex-row items-center justify-center mt-20 rounded-full bg-[#F97316] w-20 mx-auto">
            <Entypo name="camera" size={32} onPress={takePicture} />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
