import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toastr } from "../../utils/toastr";
import { isEmpty } from "../../utils";
import axios from "axios";
import { SERVER_URL } from "../../config";

const initialState = {
    isAuthenticated: false,
    aut: {},
    errors: {},
    redirect: false,
    access_token: '',
}

export const setUserInformation = createAsyncThunk(
    'auth/setUserInformation',
    async (params) => {
        try {
            const response = await axios.post(SERVER_URL + 'token', params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            console.log('Login successful:', response.data);
            toastr.success('Login successful');
            // Extracting access token from response
            const { access_token } = response.data;
            // Storing the token in local storage for later use in authenticated requests
            window.localStorage.setItem('token', access_token);
            return access_token
            // Navigate to the dashboard upon successful login
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error);
            return '';
        }
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setError: (state, action) => {state.errors = action.payload },
        setRedirect: (state, action) => {state.redirect = action.payload },
        setUser: (state, action) => {
            state.userInfo = action.payload;
            state.isAuthenticated = !isEmpty(action.payload);
        },
        setLogout:(state, action) => {
            const data = action.payload;
            state.access_token = '';
            state.isAuthenticated = false
            axios.defaults.headers.common['Authorization'] = '';
            window.localStorage.clear();
        }
    },
    extraReducers: (builder) => {
        builder.addCase(setUserInformation.fulfilled, (state, action) => {
            const data = action.payload;
            if(isEmpty(data)){
                state.access_token = '';
                state.isAuthenticated = false;
            }else{
                state.access_token = data;
                state.isAuthenticated = true;
            }
        })
    }
})

export const { setError, setRedirect, setUser, setLogout } = authSlice.actions;

export default authSlice.reducer;