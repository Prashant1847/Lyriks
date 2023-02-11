import { createSlice } from "@reduxjs/toolkit";
import apiCallBegan, {filterSongData} from '../actions'

export const minQueryLenth = 2

const searchSlice = createSlice({
    name: "search",

    initialState: {
        data: [],
        loading: false,
        error: false
    },

    reducers: {
        //solve the index passing problem
        searchDataReceived: (state, action) => {
            const data = action.payload.tracks?.hits
            const requiredData = []
            data.forEach(({track}, index)=> requiredData.push(filterSongData(track, index)))
            state.data = requiredData
        },

        setSearchError: (state, action) => {
            state.error = action.payload
        },

        setSearchLoading: (state, action) =>{
            state.loading = action.payload
        }
    }
})


export const loadsearchData = (searchQuery) => (dispatch) => {
    searchQuery = searchQuery.split(' ').join('%20')
    const url = `/v1/search/multi?query=${searchQuery}&search_type=SONGS`
    return dispatch(apiCallBegan({
        url,
        onSuccess: searchSlice.actions.searchDataReceived.type,
        onError: searchSlice.actions.setSearchError.type,
        onLoading: searchSlice.actions.setSearchLoading.type,
    }))
}

export default searchSlice.reducer