import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import * as API from './chatAPI';
import { Message } from './chatInterface';

export interface ChatState {
  messages: Message[];
}

const initialState: ChatState = {
  messages: [],
};

export const fetchOldMessages = createAsyncThunk(
  'chat/fetchedOldMessages',
  async () => await API.fetchMessages()
);

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    newMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOldMessages.fulfilled, (state, action) => {
      state.messages = action.payload;
    });
  },
});

export const { newMessage } = chatSlice.actions;
export const selectMessages = ({ chat }: RootState) => chat.messages;
export default chatSlice.reducer;
