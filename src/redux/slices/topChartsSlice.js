import { createSlice } from "@reduxjs/toolkit";
import apiCallBegan, { filterSongData } from '../actions'

const topChartsSlice = createSlice({
    name: "topCharts",

    initialState: {
        data: [],
        loading: false,
        error: false
    },

    reducers: {
        topChartsDataReceived: (state, action) => {
            const data = action.payload
            state.data = data.map((song, index)=> {
                const withoutArtistId = filterSongData(song, index)
                const artistImgSrc = song?.images?.background
                return {...withoutArtistId, artistImgSrc }
            })
        },

        setTopChartsError: (state, action) => {
            state.error = action.payload
        },

        setTopChartsLoading: (state, action) => {
            state.loading = action.payload
        }
    }
})


export const loadTopChartsData = () => (dispatch) => {
    const url = '/v1/charts/world'
    return dispatch(apiCallBegan({
        url,
        onSuccess: topChartsSlice.actions.topChartsDataReceived.type,
        onError: topChartsSlice.actions.setTopChartsError.type,
        onLoading: topChartsSlice.actions.setTopChartsLoading.type
    }))
}

export default topChartsSlice.reducer