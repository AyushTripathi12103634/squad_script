// src/Redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import modeReducer from './ModeSlice.js';
import roomReducer from './RoomSlice.js';

const store = configureStore({
    reducer: {
        mode: modeReducer,
        room: roomReducer,
    },
});

export default store;
