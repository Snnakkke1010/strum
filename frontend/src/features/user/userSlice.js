import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { USER_URL } from "../../utils/constants";
import { jwtDecode } from "jwt-decode";

export const createUser = createAsyncThunk(
  "users/createUser",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(`${USER_URL}/api/user/AddUser`, payload);
      return res.data;
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue({
        message: err.message,
        name: err.name,
        code: err.code,
      });
    }
  }
);


export const updateUser = createAsyncThunk(
    "users/updateUser",
    async (payload, thunkAPI) => {
      try {
        // Get the userId from the decoded token
        const decoded = jwtDecode(localStorage.getItem('token'));
        const userId = decoded.nameid;
  
        // Include userId in the payload
        const updatedPayload = {
          userId,
          ...payload,
        };
  
        // Make the API request to update user details
        const res = await axios.put(`${USER_URL}/api/user/UpdateUserDetails`, updatedPayload);
        console.log(res.data);
        return res.data;
      } catch (err) {
        console.error(err);
        return thunkAPI.rejectWithValue({
          message: err.message,
          name: err.name,
          code: err.code,
        });
      }
    }
  );
  


export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(`${USER_URL}/api/user/Login`, payload);
      localStorage.setItem('token', res.data.token);
      console.log(res.data);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      const decoded = jwtDecode(res.data.token);
      console.log(decoded);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue({
        message: err.message,
        code: err.code,
      });
    }
  }
);


export const getUserById = createAsyncThunk(
    "users/getUserById",
    async (id, thunkAPI) => {
      try {
        console.log(id);
        const res = await axios.post(`${USER_URL}/api/user/GetUser/${id}`);
        console.log(res.data);
        return res.data;
      } catch (err) {
        return thunkAPI.rejectWithValue({
          message: err.message,
          code: err.code,
        });
      }
    }
  );



// export const updateUser = createAsyncThunk(
//   "users/updateUser",
//   async (payload, thunkAPI) => {
//     try {
//       const res = await axios.put(`${BASE_URL}/Users/${payload.id}`, payload);
//       return res.data;
//     } catch (err) {
//       console.log(err);
//       return thunkAPI.rejectWithValue(err);
//     }
//   }
// );


const initialState = {
  currentUser: null,
  isLoading: false,
  isAuthorized: false
};



const userSlice = createSlice({
  name: "user",
  initialState,
  
  reducers: {
    logOut: (state) => {
      state.token = null;
      localStorage.removeItem('token');
      state.isAuthorized = false;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(createUser.fulfilled, (state, action) => {
      state.isLoading= false;
      state.token = action.payload.token;
      state.isAuthorized = true;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading= false;
      state.token = action.payload.token;
      state.isAuthorized = true;
    })
    .addCase(getUserById.fulfilled, (state, action) => {
      state.isLoading= false;
      state.currentUser = action.payload;
    })
    .addCase(getUserById.rejected, (state, action) => {
        state.isLoading= false;
        state.currentUser = null;
      })
    .addCase(createUser.rejected, (state) => {
      state.isLoading = false;
      state.token = null;
      state.isAuthorized = false;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthorized = false;
      state.token = null;
    })
    .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading= false;
        
    })
    .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
    // Handle the error accordingly
        console.error('Error updating user:', action.payload.message);
    });

  },
});

export const { logOut } = userSlice.actions;
export default userSlice.reducer;


