import { Button, Center, Image, View } from 'native-base';
import React, {Component} from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {primaryColor} from '../utils/colors';
import DocumentPicker from 'react-native-document-picker';


const UploadPhotos = (props) => {
  async function UploadFile () {
    console.log('upload');
      try{
        const pickerResult = await DocumentPicker.pickSingle({
          presentationStyle: 'fullScreen',
          copyTo: 'cachesDirectory',
        });
        console.log("image uploadée", pickerResult);
        props.setImages(props.images.concat([pickerResult]))
        
      } catch(err){
        console.error(err)
        throw err;
      }
    }

    async function DeleteFile(image) {

        try{
          console.log("delete", image);
          props.images.splice(props.images.findIndex(a => a.id === image.id), 1)
          
        } catch(err){
          console.error(err)
          throw err;
        }
  
      }
    
    console.log("images affichées", props.images)
    return (
        <View style={{flex:1, flexDirection: "row", flexWrap:"wrap", justifyContent:'center', alignItems:'center'}}> 
          {props.images.map((image)=>{
            return (
              <Button style={{justifyContent:'center', alignItems:'center', height: 200, width: 130, margin:5, borderRadius:15, borderWidth:4, borderColor:primaryColor, backgroundColor:'#983648'}}>
                <Button onPress={()=>DeleteFile(image)}>X</Button>
                <Image source={{
                    uri: image.uri
                  }} alt="Alternate Text" size="xl" />
              </Button>
            )
          })}    
          {
            props.images.length < 4 ? (
              <Button onPress={()=>UploadFile()} style={{justifyContent:'center', alignItems:'center', height: 200, width: 130, margin:5, borderRadius:15, borderWidth:4, borderColor:primaryColor, backgroundColor:'#983648'}}>
                  <Ionicons name={'add-circle-outline'} size={40} color={primaryColor} />
              </Button>
            ): null
          }
           
        </View>
      );
    };
    
    export default UploadPhotos;