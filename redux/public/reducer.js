import { LOADING, SUCCESS_MSG, SET_USER, SET_SCANNED_ASSET } from "./constants";

const initialState = {
  isLoading: false,
  user: null,
  scannedAsset: null,
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_USER: {
      return {
        ...state,
        user: payload,
      };
    }
    case LOADING: {
      return {
        ...state,
        isLoading: payload,
      };
    }
    default:
      return state;
  }
}
