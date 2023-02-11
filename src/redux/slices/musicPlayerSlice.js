import { createSlice } from "@reduxjs/toolkit";

const musicPlayerSlice = createSlice({
    name: "musicPlayer",
    initialState: {
        currentSong: {},
        playlist: [],
        showMusicPlayer: false,
        isPlaying: false,
    },

    reducers: {
        initalizeMusicPlayer: (state, action) => {
            if (!state.showMusicPlayer) state.showMusicPlayer = true
            const { songToSelect, playlistToSelect } = action.payload
            state.currentSong = songToSelect
            state.playlist = playlistToSelect
        },

        changeCurrentSong: (state, action) => {
            state.currentSong = action.payload
        },

        setIsPlaying: (state, action) => {
            state.isPlaying = action.payload
        },

    }
})


export const setUpMusicPlayer = (songToSelect, playlistToSelect) => (dispatch, getState) => {
    const { currentSong, playlist } = getState().musicPlayer
    if (songToSelect.songUrl !== currentSong.songUrl || playlistToSelect !== playlist) {
        dispatch(musicPlayerSlice.actions.initalizeMusicPlayer({ songToSelect, playlistToSelect }))
    } else {
        dispatch(setIsPlaying(true))
    }
}


export const { changeCurrentSong, setIsPlaying } = musicPlayerSlice.actions
export default musicPlayerSlice.reducer