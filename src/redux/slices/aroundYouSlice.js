import { createSlice } from "@reduxjs/toolkit";
import apiCallBegan, {filterSongData} from '../actions'

const aroundYouSlice = createSlice({
    name: "aroundYou",

    initialState: {
        countryCode: null,
        data: [],
        loading: false,
        error: false
    },

    reducers: {
        setCountryCode: (state, action) => {
            state.countryCode = action.payload
        },

        aroundYouDataReceived: (state, action) => {
            const data = action.payload
            state.data = data.map(filterSongData)
        },

        setAroundYouError: (state, action) => {
            state.error = action.payload
        },

        setAroudYouLoading: (state, action) => {
            state.loading = action.payload
        }
    }
})


export const loadAroundYouData = () => (dispatch, getState) => {
    const countryCode = getState().aroundYou.countryCode
    const url = `/v1/charts/country?country_code=${countryCode}`

    return dispatch(apiCallBegan({
        url,
        onSuccess: aroundYouSlice.actions.aroundYouDataReceived.type,
        onError: aroundYouSlice.actions.setAroundYouError.type,
        onLoading: aroundYouSlice.actions.setAroudYouLoading.type
    }))
}

export const { setCountryCode } = aroundYouSlice.actions
export default aroundYouSlice.reducer