import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import * as API from './loginAPI';
import { User } from './loginInterface';

interface LoginState {
  loggedUser: string;
  status: 'idle' | 'logging';
  error:
    | ''
    | 'This account is not registered!'
    | 'Incorrect password.'
    | string;
}

const initialState: LoginState = {
  loggedUser: '',
  status: 'idle',
  error: '',
};

export const logged = createAsyncThunk(
  'login/logged',
  async ({ username, password }: User) => await API.login(username, password)
);

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logged.pending, (state) => {
        state.error = '';
        state.status = 'logging';
      })
      .addCase(logged.fulfilled, (state, action) => {
        const result = action.payload;
        state.status = 'idle';

        if (result === -1) state.error = 'This account is not registered!';
        else if (result === 0) state.error = 'Incorrect password.';
        else if (typeof result === 'string') state.error = result;
        else state.loggedUser = result.username;
      });
  },
});

export const selectLoggedUser = ({ login }: RootState) => login.loggedUser;
export const selectLoginError = ({ login }: RootState) => login.error;
export const selectLoginStatus = ({ login }: RootState) => login.status;

export default loginSlice.reducer;
