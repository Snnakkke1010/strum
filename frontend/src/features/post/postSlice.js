import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { USER_URL } from "../../utils/constants";


const token = localStorage.getItem('token'); // Replace with the actual token
const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'multipart/form-data', // Make sure to set the content type for FormData
};
console.log('Token:', token);


export const getPostsByUserId = createAsyncThunk(
    'posts/getPostsByUserId',
    async (userId, thunkApi) => {
      try {
        const res = await axios.get(`${USER_URL}/api/post/GetPostsByUser/${userId}`);
        console.log('Response:', res);
        return res.data;
      } catch (err) {
        console.log('Error:', err);
        return thunkApi.rejectWithValue({
          message: err.message,
          name: err.name,
          code: err.code,
        });
      }
    }
  );


export const sendPost = createAsyncThunk('posts/sendPost',
  async ({text, userId}, thunkApi) => {
    try {
    
      const res = await axios.post(`${USER_URL}/api/post/AddPost`,{
        Text: text,
        UserId: userId
      });
      console.log('Response:', res.data);
      return res.data;

    } catch (err) {
      console.log('Error:', err);
      // Reject with a simplified error object
      return thunkApi.rejectWithValue({
        message: err.message,
        name: err.name,
        code: err.code,
      });
    }
  }
);

const postSlice = createSlice({
    name: 'posts',
    initialState: {
        list: [],
        isLoading: false,
    },
    extraReducers: (builder) => {
        builder
        .addCase(getPostsByUserId.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getPostsByUserId.fulfilled, (state, {payload}) => {
            console.log('Payload:', payload);
            state.isLoading = false;
            state.list = payload; // Assuming the payload is an array of posts
        })
        .addCase(getPostsByUserId.rejected, (state) => {
            state.isLoading = false;
        })
        .addCase(sendPost.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(sendPost.fulfilled, (state, { payload }) => {
            state.isLoading = false;
        })
        .addCase(sendPost.rejected, (state) => {
            state.isLoading = false;
        });
       
    }
})

export default postSlice.reducer;

