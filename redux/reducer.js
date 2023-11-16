import { createStore } from 'redux';
import { addAd, updateAd, deleteAd } from './actions'; // Import your actions

// Initial state of the application
const initialState = {
  ads: [],
};

// Reducer function
const adReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_AD':
      return { ...state, ads: [...state.ads, action.payload] };

    case 'UPDATE_AD':
      const updatedAds = state.ads.map((ad) =>
        ad.id === action.payload.id ? action.payload : ad
      );
      return { ...state, ads: updatedAds };

    case 'DELETE_AD':
      const filteredAds = state.ads.filter((ad) => ad.id !== action.payload);
      return { ...state, ads: filteredAds };

    default:
      return state;
  }
};

export default adReducer;
