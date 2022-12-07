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
  TextArea
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import AppBar from '../components/AppBar/AppBar';
import { addProfileInfos } from '../reducers/ProfileSlice';
import { store } from '../store/store';

interface Props {
  navigation: any
}

const ProfileAddInformationsScreen = (props: Props) => {
  
  const [firstname, setFirstname] = useState<string>('')
  const [lastname, setLastname] = useState<string>('')
  const [age, setAge] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [gender, setGender] = useState<string>('')
  const [bio, setBio] = useState<string>('')


  const handleSubmit =  async () => {

    const result = await store.dispatch(addProfileInfos({firstname, lastname, age, phone, gender, bio}))
    // console.log('PPL', result);
    
  }

  //Surveille le state, le déclenche au 1 er render de loginScreen et quand isAuthenticated change

//   useEffect(()=>{
//     //naviguer vers la page d'accueil
//     if (isAuthenticated == true) {
//       console.log("la", isAuthenticated);
      
//       props.navigation.navigate('MainScreen', {
//         screen: 'HomeScreen'
//       })
//     }
//   }, [isAuthenticated])

  return (
    <ScrollView>
        <AppBar navigation={props.navigation} goBack={true} ScreenName="Fill your profile" />
        <Center w="100%" h="100%" style={{backgroundColor: '#1A1B22', paddingTop: 50}}>
        <Box safeArea p="2" py="2" w="90%" style={{flex:1}}>
          <Image source={require("../assets/images/user1.jpg")} alt="Love Option" style={{width: 100, height: 100, borderRadius:50, alignSelf: "center"}}/>
          <TouchableOpacity style={{alignSelf: "center", marginLeft:70}}>
            <Ionicons name={'add-circle-outline'} size={20} color={primaryColor} />
          </TouchableOpacity>
          <VStack space={3}>
            <FormControl>
              <FormControl.Label style={{left:20}}>Firstname</FormControl.Label>
              <TextInput placeholder='Firstname' onChangeText={(e) => setFirstname(e)} placeholderTextColor="white" style={{backgroundColor: "#23252F", borderColor:"#FE5870",borderRadius:50, borderWidth:2, paddingLeft:20, color:'white'}}/>
            </FormControl>
            <FormControl>
              <FormControl.Label style={{left:20}}>Lastname</FormControl.Label>
              <TextInput placeholder='Lastname' onChangeText={(e) => setLastname(e)} placeholderTextColor="white" style={{backgroundColor: "#23252F", borderColor:"#FE5870",borderRadius:50, borderWidth:2, paddingLeft:20, color:'white'}}/>
            </FormControl>
            <FormControl>
              <FormControl.Label style={{left:20}}>Age</FormControl.Label>
              <TextInput placeholder='Age' onChangeText={(e) => setAge(e)} placeholderTextColor="white" style={{backgroundColor: "#23252F", borderColor:"#FE5870",borderRadius:50, borderWidth:2, paddingLeft:20, color:'white'}}/>
            </FormControl>
            <FormControl>
              <FormControl.Label style={{left:20}}>Phone</FormControl.Label>
              <TextInput placeholder='Phone' onChangeText={(e) => setPhone(e)} placeholderTextColor="white" style={{backgroundColor: "#23252F", borderColor:"#FE5870",borderRadius:50, borderWidth:2, paddingLeft:20, color:'white'}}/>
            </FormControl>
            <FormControl style={{borderWidth:0}}>
              <FormControl.Label style={{left:20}}>Gender</FormControl.Label>
              <Select onChange={(e) => setGender(e)} style={{backgroundColor: "#23252F", borderColor:"#FE5870",borderRadius:50, borderWidth:2, paddingLeft:20}} placeholder="Gender" mt="1">
                <Select.Item label="Female" value="Female" />
                <Select.Item label="Male" value="Male" />
                <Select.Item label="both" value="both" />
              </Select>
            </FormControl>
            <FormControl>
              <FormControl.Label style={{left:20}}>Bio</FormControl.Label>
              <TextInput placeholder='Bio' onChangeText={(e) => setBio(e)} maxLength={240} placeholderTextColor="white" style={{backgroundColor: "#23252F", borderColor:"#FE5870",borderRadius:50, borderWidth:2, paddingLeft:20, color:'white'}}/>
            </FormControl>
            <Button 
              mt="1" 
              style={{backgroundColor: '#FD6B80', borderColor:"#FE5870",borderRadius:50, marginTop:25}}
              onPress={() => {handleSubmit(), props.navigation.navigate('ProfileAddPhotosScreen')}}>
              <Text style={{color: '#FFFFFF'}}>Next</Text>
            </Button>
          </VStack>
        </Box>
      </Center>
    </ScrollView>
  );
};

export default ProfileAddInformationsScreen;