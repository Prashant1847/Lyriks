import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: "uiSlice",
    initialState:{
        showNavOnSmallDevices: false,
        show_volumeRange_onSmallDevices: false,
    },

    reducers:{
        setShowNavOnSmallDevices: (state, action) =>{
            state.showNavOnSmallDevices = action.payload
        },

        set_Show_VolumeRange_OnSmallDevices: (state, action) =>{
            console.log("inside third handler")
            state.show_volumeRange_onSmallDevices = action.payload
        }
    }
})

export const toggleNavBarOnSmallDevices = () => (dispatch, getState)=>{
    const {showNavOnSmallDevices} = getState().uiSlice
    return dispatch(uiSlice.actions.setShowNavOnSmallDevices(!showNavOnSmallDevices))
}

export const toggle_volumeRange_onSmallDevices = () => (dispatch, getState)=>{
    const {show_volumeRange_onSmallDevices} = getState().uiSlice
    console.log("inside second hancdler", show_volumeRange_onSmallDevices)
    return dispatch(uiSlice.actions.set_Show_VolumeRange_OnSmallDevices(!show_volumeRange_onSmallDevices))
}

export default uiSlice.reducer