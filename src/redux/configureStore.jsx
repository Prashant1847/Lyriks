import { configureStore} from "@reduxjs/toolkit";
import {
	aroundYouReducer,
	topchartsReducer,
	discoverReducer,
	searchReducer,
	songDetailsReducer,
	artistDetailsReducer,
	musicPlayerReducer,
	uiSliceReducer
} from './slices'

import apiMiddleWare from "./apiMiddleware";


export const store = configureStore({
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiMiddleWare),
	reducer: {
		discover: discoverReducer,
		topCharts: topchartsReducer,
		aroundYou: aroundYouReducer,
		search: searchReducer,
		songDetails: songDetailsReducer,
		artistDetails: artistDetailsReducer,
		musicPlayer: musicPlayerReducer,
		uiSlice: uiSliceReducer
	}
})



