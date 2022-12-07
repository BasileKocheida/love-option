import {API, API_IMG, getTokenFromStorage} from '../utils';
import axios, {AxiosResponse} from 'axios';

class ProfileService {
  constructor(
    private loginBaseUrl = '/api/profiles', // private meBaseUrl = '/me', // private token = getTokenFromStorage()
  ) {}
  async addProfileInfos(firstname: string, lastname: string, age: string, phone: string, gender: string, bio: string): Promise<AxiosResponse> {
    try {
      console.log(API.getUri() + this.loginBaseUrl, firstname, lastname, age, phone, gender, bio);
      const body = {
        firstname: firstname,
        laststname: lastname,
        age: age,
        phone: phone,
        gender: gender,
        bio: bio,
      }
      return await API.post(this.loginBaseUrl, body);
    } catch (error) {
      console.log(error);
      throw new Error('Error ProfileService : ' + JSON.stringify({...error}));
    }
  }
}

export const profileServices = new ProfileService();
