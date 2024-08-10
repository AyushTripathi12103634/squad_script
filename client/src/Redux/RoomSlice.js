// src/Redux/RoomSlice.js
import { createSlice } from '@reduxjs/toolkit';

const roomSlice = createSlice({
    name: 'room',
    initialState: {
        meetingId: null,
        username: '',
    },
    reducers: {
        setMeetingId: (state, action) => {
            state.meetingId = action.payload;
        },
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        clearRoomState: (state) => {
            state.meetingId = null;
            state.username = '';
        },
    },
});

export const { setMeetingId, setUsername, clearRoomState } = roomSlice.actions;
export default roomSlice.reducer;
