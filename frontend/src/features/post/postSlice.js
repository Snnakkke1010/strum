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


//   export const sendDeletePost = createAsyncThunk(
//     'posts/sendDeletePost',
//     async (postId, thunkApi) => {
//       try {
//         const res = await axios.delete(`${USER_URL}/api/post/DeletePost/${postId}`);
//         console.log('Response:', res.data);
//         return postId; // Return the postId to remove it from the state
//       } catch (err) {
//         console.log('Error:', err);
//         return thunkApi.rejectWithValue({
//           message: err.message,
//           name: err.name,
//           code: err.code,
//         });
//       }
//     }
//   );
  


export const sendPost = createAsyncThunk('posts/sendPost',
  async ({text, userId}, thunkApi) => {
    try {
    
      const res = await axios.post(`${USER_URL}/api/post/AddPost`,
      {
        text: text,
        userId: userId
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
    name: 'post',
    initialState: {
        list: [],
        isLoad: false,
    },
    extraReducers: (builder) => {
        builder
        .addCase(getPostsByUserId.pending, (state) => {
            state.isLoad = true;
        })
        .addCase(getPostsByUserId.fulfilled, (state, {payload}) => {
            console.log('Payload:', payload);
            state.isLoad = false;
            state.list = payload; // Assuming the payload is an array of posts
        })
        .addCase(getPostsByUserId.rejected, (state) => {
            state.isLoad = false;
        })
        .addCase(sendPost.pending, (state) => {
            state.isLoad = true;
        })
        .addCase(sendPost.fulfilled, (state, { payload }) => {
            state.isLoad = false;
        })
        .addCase(sendPost.rejected, (state) => {
            state.isLoad = false;
        });
        // builder.addCase(sendDeletePost.fulfilled, (state, { payload }) => {
        //     // Remove the deleted post from the state
        //     state.list = state.list.filter((post) => post.id !== payload);
        //     state.isLoad = false;
        //   });
       
    }
})

export default postSlice.reducer;

