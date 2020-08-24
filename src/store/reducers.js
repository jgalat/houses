import actions from './actions';

export const initialState = {
  houses: [],
  currPage: 0,
  loading: false,
  retry: 0,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_HOUSES:
      return {
        ...state,
        loading: true,
      };
    case actions.STORE_HOUSES:
      return {
        houses: state.houses.concat(action.payload.houses),
        currPage: state.currPage + 1,
        loading: false,
        retry: 0,
      };
    case actions.RETRY:
      return {
        ...state,
        retry: state.retry + 1,
      };
    default:
      return state;
  }
}
