import { FEED_REQUEST, FEED_SUCCESS, FEED_FAILURE } from '../actionTypes.js'

const ITEMS_PER_PAGE = 20

const initialState = {
  items: [],       // accumulated list of news items across loaded pages
  page: 0,         // most recently loaded page index (zero-based)
  hasMore: true,   // false when the last fetched page returned fewer than ITEMS_PER_PAGE items
  loading: false,
  error: null,
}

export function feedReducer(state = initialState, action) {
  switch (action.type) {
    case FEED_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        // Reset items when loading page 0 (topic change or initial load)
        items: action.payload.page === 0 ? [] : state.items,
      }

    case FEED_SUCCESS:
      return {
        ...state,
        loading: false,
        items: [...state.items, ...action.payload.newsItems],
        page: action.payload.page,
        hasMore: action.payload.newsItems.length === ITEMS_PER_PAGE,
        error: null,
      }

    case FEED_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

