import { Link } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {primaryColor} from '../utils/colors';
import {
  Box,
  Center,
  VStack,
  FormControl,
  Button,
  HStack,
  Text,
  Image,
  Icon,
  ScrollView,
  Select,
  WarningOutlineIcon,
  CheckIcon,
  TextArea,
  View
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import AppBar from '../components/AppBar/AppBar';
import { login } from '../reducers/AuthSlice';
import { store } from '../store/store';
import UploadPhotos from '../components/UploadPhotos';
import DocumentPicker from 'react-native-document-picker';

interface Props {
  navigation: any
}

const ProfileAddPhotosScreen = (props: Props) => {
  
  const [images, setImages] = useState<Array<any>>([])


  const handleSubmit =  async () => {

    let formData = new FormData()
    images.forEach((image, index) => {
      formData.append(`image${index}`, image)
    });

  }

  return (
    <View>
      <AppBar navigation={props.navigation} goBack={false} ScreenName="Add photos to your profile" />
      <Center w="100%" h="100%" style={{backgroundColor: '#1A1B22', paddingTop: 50}}>
        <Box safeArea p="2" py="2" w="90%" style={{flex:1}}>
          <UploadPhotos setImages={setImages} images={images}/>
          <Button 
            mt="1" 
            style={{backgroundColor: '#FD6B80', borderColor:"#FE5870",borderRadius:50, marginTop:25}}
            onPress={() => {props.navigation.navigate('')}}>
            <Text style={{color: '#FFFFFF'}}>Next</Text>
          </Button>
        </Box>
      </Center>
    </View>
  );
};

export default ProfileAddPhotosScreen;