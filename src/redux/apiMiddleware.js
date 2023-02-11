import apiCallBegan from './actions'
const baseUrl = "https://shazam-core.p.rapidapi.com"

const apiMiddleWare = ({dispatch}) => next => async action => {
    if (action.type !== apiCallBegan.type) return  next(action)

    const { url, onSuccess, onError, onLoading } = action.payload

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_SHAZAM_CORE_RAPID_API_KEY,
            'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
        }
    };

    dispatch({type: onError, payload: false})
    dispatch({type: onLoading, payload: true})

    try {
        const response = await fetch(baseUrl + url, options)
        if(!response.ok) throw new Error("Something went wrong");
        const data = await response.json()
        
        dispatch({type: onSuccess, payload: data})
        
    } catch(err){
        dispatch({type: onError, payload: "Data not recieved"})
    } finally{
        dispatch({type: onLoading, payload: false})
    }
}

export default apiMiddleWare