import React from 'react';
import io from 'socket.io-client'
import store from '../store'
import { SERVER_URL } from '../config';
import { isEmpty } from '.';
import { setDumyData } from '../store/slice/settingSlice';
const socket = io(isEmpty(SERVER_URL) ? '/' : SERVER_URL, { transports: ['websocket'] });

socket.on("connect", () => {
  console.log("connect: ", socket.id);
})

socket.on("disconnect", () =>{
  console.log("disconnect: ", socket.id);
})

socket.on("dumy_data", (data) => {
  store.dispatch(setDumyData(data));
})


export default socket;