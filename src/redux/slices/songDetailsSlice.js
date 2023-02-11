import { createSlice } from "@reduxjs/toolkit";
import apiCallBegan, {filterSongData} from '../actions'

//try removing all property in data object 
const initialState = {
    data: {},
    dataError: false,
    loadingData: false,

    relatedSongData: [],
    loadingRelatedSong: false,
    relatedSongDataError: false
}

const songDetailsSlice = createSlice({
    name: "songDetails",
    initialState,

    reducers: {

        songDataReceived: (state, action) => {
            const data = action.payload
            const { title, subtitle} = data
            const imgSrc = data?.images?.coverart
            const lyrics = data?.sections?.[1]?.text
            const genre = data?.genres?.primary

            state.data = {title, subtitle, imgSrc, lyrics, genre}
        },

        setSongDetailsLoading: (state, action) =>{
            state.loadingData = action.payload
        },

        setSongDataError: (state, action) =>{
            state.dataError = action.payload
        },

        relatedSongDataReceived: (state, action) =>{
            const data = action.payload
            state.relatedSongData = data.map(filterSongData)
        },

        setRelatedSongError: (state, action) =>{
            state.relatedSongDataError = action.payload
        },

        setSongRelatedLoading: (state, action) =>{
            state.loadingRelatedSong = action.payload
        },

    }
})


export const loadSongDetailsData = (trackId) => (dispatch) => {
    const url = `/v1/tracks/details?track_id=${trackId}`

    return dispatch(apiCallBegan({
        url,
        onSuccess: songDetailsSlice.actions.songDataReceived.type,
        onError: songDetailsSlice.actions.setSongDataError.type,
        onLoading: songDetailsSlice.actions.setSongDetailsLoading.type,
    }))
}

export const loadRelatedSongData = (trackId) => (dispatch) => {
    const url = `/v1/tracks/related?track_id=${trackId}`

    return dispatch(apiCallBegan({
        url,
        onSuccess: songDetailsSlice.actions.relatedSongDataReceived.type,
        onError: songDetailsSlice.actions.setRelatedSongError.type,
        onLoading: songDetailsSlice.actions.setSongRelatedLoading.type,
    }))
}

export default songDetailsSlice.reducer