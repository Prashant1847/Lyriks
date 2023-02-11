import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useParams } from 'react-router-dom'
import { FeedTitle, Grid, Loading, SongCard, Error } from '../components'

import { loadsearchData } from '../redux/slices/searchSlice'
import { setUpMusicPlayer } from '../redux/slices/musicPlayerSlice'


const Search = () => {
    const { query } = useParams()

    const { data: searchResult, loading, error } = useSelector(state => state.search)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadsearchData(query))
    }, [query])

    const handlePlayerSetUp = (songData) => {
        dispatch(setUpMusicPlayer(songData, searchResult))
    }

    return (
        <>
            {error && <Error callBackForRetry={() => dispatch(loadsearchData(query))} />}

            {loading && <Loading title={`Loading results for ${query}`} />}

            {(!error && !loading) && <>
                <FeedTitle title={`Showing Results for ${query}`} />
                <Grid data={searchResult} Card={SongCard} callBackForCard={handlePlayerSetUp} />
            </>}
        </>
    )
}

export default Search