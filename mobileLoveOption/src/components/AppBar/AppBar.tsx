import {Button, Heading, HStack, Text, VStack} from 'native-base';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
  navigation: any;
  goBack: boolean;
  ScreenName: string;
}

export default function AppBar(props: Props) {
  return (
    <HStack
      justifyContent={'space-between'}
      bgColor="black"
      p={4}
      width={'100%'}>
      {props.goBack === true ? (
        <Button
          variant={'outline'}
          borderRadius="full"
          onPress={() => {
            if (props.navigation.canGoBack()) {
              props.navigation.goBack();
            } else {
              props.navigation.navigate('MainScreen', {
                screen: 'HomeScreen',
              });
            }
          }}>
          <Ionicons name={'arrow-back'} size={20} color={'#fff'} />
        </Button>
      ) : (
        <Button
          variant={'outline'}
          borderRadius="full"
          onPress={() => {
            props.navigation.navigate('ProfilScreen')
          }}>
          <Ionicons name={'person'} size={20} color={'#fff'} />
        </Button>
      )}
      <HStack alignItems={'center'} justifyContent={'flex-start'}>
        <Heading color={'#fff'}>{props.ScreenName ?? 'LoveOption'}</Heading>
      </HStack>
      <Button variant={'outline'}>
        <Ionicons name={'home'} size={20} color={'#fff'} />
      </Button>
    </HStack>
  );
}
