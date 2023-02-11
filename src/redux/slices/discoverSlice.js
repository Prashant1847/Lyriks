import { createSlice } from "@reduxjs/toolkit";
import apiCallBegan, {filterSongData} from '../actions'

const discoverSlice = createSlice({
    name: "discover",

    initialState: {
        genre: "POP",
        data: [],
        loading: false,
        error: false
    },

    reducers: {
        setGenre: (state, action) => {
            state.genre = action.payload
        },

        discoverDataReceived: (state, action) => {
            const data = action.payload
            state.data = data.map(filterSongData)
        },

        setDiscoverError: (state, action) => {
            state.error = action.payload
        },

        setDiscoverLoading: (state, action) => {
            state.loading = action.payload
        }
    }
})


export const loadDiscoverData = () => (dispatch, getState) => {
    const genre = getState().discover.genre
    const url = `/v1/charts/genre-world?genre_code=${genre}`

    return dispatch(apiCallBegan({
        url,
        onSuccess: discoverSlice.actions.discoverDataReceived.type,
        onError: discoverSlice.actions.setDiscoverError.type,
        onLoading: discoverSlice.actions.setDiscoverLoading.type
    }))
}


export const { setGenre } = discoverSlice.actions
export default discoverSlice.reducer