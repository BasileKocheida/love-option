// import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosResponse} from 'axios';

const baseURL = "http://192.168.1.77/love-option/public";

const request = axios.create({
  baseURL: baseURL,
  headers: {
    'accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Export axios as a library for managing API calls.
export const API = request;

export interface ApiResponseData {}

// Export ApiResponseObj as a response object type.
export interface ApiResponseObj<T = ApiResponseData> extends AxiosResponse<T> {}

// Export ApiResponse as a return type of any API request.
export interface ApiResponse extends Promise<any> {}

// export enum STORAGE_KEY {
//   AuthToken = 'token',
// }

export const storeLocalData = async (storage_Key: string, value: string) => {
    try {
      //const jsonValue = value;
      await AsyncStorage.setItem(storage_Key, value);
    } catch (e) {
      // saving error
      console.log(e);
    }
};

export const removeLocalData = async (storage_Key: any) => {
  await AsyncStorage.removeItem(storage_Key);
};

export const getTokenFromStorage = async () => {
  await AsyncStorage.getItem('token')
}