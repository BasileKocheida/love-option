import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import UserModel from '../models/UserModel';
import { profileServices } from '../services/ProfileServices';
import {removeLocalData, storeLocalData} from '../utils';

interface SliceState {
    firstname: string | null;
    lastname: string | null;
    age: string | null;
    phone: string | null;
    gender: string | null;
    bio: string | null;
}

const initialState: SliceState = {
  firstname: null,
  lastname: null,
  age: null,
  phone: null,
  gender: null,
  bio: null,

};

const ProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setFirstname: (state: {firstname: any}, action: PayloadAction<string>) => {
        state.firstname = action.payload;
    },
    setLastname: (state: {lastname: any}, action: PayloadAction<string>) => {
        state.lastname = action.payload;
    },
    setAge: (state: {age: any}, action: PayloadAction<string>) => {
        state.age = action.payload;
    },
    setPhone: (state: {phone: any}, action: PayloadAction<string>) => {
        state.phone = action.payload;
    },
    setGender: (state: {gender: any}, action: PayloadAction<string>) => {
        state.gender = action.payload;
    },
    setBio: (state: {bio: any}, action: PayloadAction<string>) => {
        state.bio = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(addProfileInfos.fulfilled, (state, action) => {
      // console.log('Login :', state);
    });
  },
});

export const {setFirstname, setLastname, setAge, setPhone, setGender, setBio} = ProfileSlice.actions;
export default ProfileSlice.reducer;

export const addProfileInfos = createAsyncThunk(
  'profiles/addProfileInfos',
  async (data: {firstname: string; lastname: string; age: string; phone: string; gender: string; bio: string;}, thunkAPI) => {
    const response = await profileServices.addProfileInfos(data.firstname, data.lastname, data.age, data.phone, data.gender, data.bio);
    console.log(response.data);
    console.log(response.status);

    // if (response.status == 200) {
    //   await storeLocalData('token', response.data.token);
    //   thunkAPI.dispatch(setToken(response.data.token));
    //   thunkAPI.dispatch(setIsAuthenticated(true));
    //   thunkAPI.dispatch(setIsLoading(false));

    //   return true;
    // }

    return response;
  },
);

// export const getUser = createAsyncThunk(
//   'users/get',
//   async (data: null, thunkAPI) => {
//     const response = await authService.me();
//     if (response.status == 200) {
//       const user = new UserModel(response.data.user);
//     }
//     return response.data.token;
//   },
// );
