import { createSlice } from "@reduxjs/toolkit";
import apiCallBegan from '../actions'

//try removing all property in data object 

const artistDetailsSlice = createSlice({
    name: "artistDetails",
    initialState: {
        data: {
            relatedSongs: []
        },
        loading: false,
        error: false
    },

    reducers: {

        artistDetailsReceived: (state, action) => {
            const data = action.payload?.data?.[0]

            const {origin, name} = data?.attributes
            const imgSrc = data?.attributes?.artwork?.url
            const songData = data?.views?.['top-songs']?.data
            const requiredSongData = []
            
            songData.forEach((song, index)=> {
                const id = song?.id
                const {name:title, albumName:subtitle } = song?.attributes
                const songUrl = song?.attributes?.previews?.[0]?.url //this refers to song audio url
                const imgSrc = song?.attributes?.artwork?.url
                requiredSongData.push({
                    id, subtitle, songUrl, imgSrc, title, index
                })
            })

            state.data = {
                name, origin, imgSrc,
                relatedSongs: requiredSongData
            }
        },

        setArtistDetailsError: (state) => {
            state.dataError = true
        },

        setArtistDetailsLoading: (state, action) => {
            state.loading = action.payload
        }
    }
})

export const loadArtistDetailsData = (artist_id) => (dispatch) => {
    const url = `/v2/artists/details?artist_id=${artist_id}`

    return dispatch(apiCallBegan({
        url,
        onSuccess: artistDetailsSlice.actions.artistDetailsReceived.type,
        onError: artistDetailsSlice.actions.setArtistDetailsError.type,
        onLoading: artistDetailsSlice.actions.setArtistDetailsLoading.type,
    }))
}

export default artistDetailsSlice.reducer