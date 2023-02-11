import { createAction } from "@reduxjs/toolkit";

export default createAction("apiCallBegan")

export function filterSongData(song, index){
        const { title, subtitle, key } = song
        const imgSrc = song?.images?.coverart
        const songUrl = song?.hub?.actions?.[1]?.uri
        const artistId = song?.artists?.[0]?.adamid
        return {
            title,
            subtitle,
            imgSrc,
            songUrl,
            key,
            index,
            artistId
        }
}