import React, { useState } from 'react';
import { View, Text, Image, ImageBackground, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import CustomButton from '../../components/CustomButton';
import * as ImagePicker from 'expo-image-picker';

const Device = () => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // Request permission to access media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "Please enable media library permissions to upload an image.");
      return;
    }

    // Open image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      // Proceed to extract text from the image (not saved in storage)
      extractTextFromImage(result.uri);
    }
  };

  const extractTextFromImage = (uri) => {
    // Add your text extraction logic here.
    Alert.alert("Processing", "Text extraction from the selected image will be processed.");
  };

  return (
    <>
      <StatusBar style="light" />
      <ImageBackground source={images.onboardingBg} style={{ flex: 1 }} resizeMode="cover">
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.2)']}
          style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
          start={{ x: 0.5, y: 0.4 }}
          end={{ x: 0.5, y: 1 }}
        />
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ height: '100%' }}>
            <View className="flex-1 mt-[3.5vh] mb-[3.5vh] justify-between">
              <View className="flex-1 px-5">
                <View className="flex-row items-center">
                  <Image source={images.logoBlue} className="w-[50px] h-[50px]" resizeMode="contain" />
                  <Text className="text-white font-pbold text-4xl ml-2 mt-2">HyperScribe</Text>
                </View>

                <View className="mt-10">
                  <Text className="text-white font-pbold text-2xl">Upload and Process Image</Text>
                </View>
              </View>

              <View className="flex-1 p-5 justify-center items-center">
                {image && (
                  <Image source={{ uri: image }} style={{ width: 200, height: 200, borderRadius: 10 }} />
                )}
                <CustomButton
                  title="Choose Image"
                  handlePress={pickImage}
                  containerStyles="w-[80vw] p-4 bg-[#050505] mb-[20px]"
                  textStyles="text-white text-[18px] font-pbold"
                />
                {image && (
                  <Text className="text-white font-pmedium text-[16px] mt-4">Image selected. Processing...</Text>
                )}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
};

export default Device;