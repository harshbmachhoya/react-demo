import { FETCH_POSTS, ADD_POST, EDIT_POST, FETCH_POST_BY_ID, SET_CURRENT_USER } from "../actions/types";

const initialState = {
  items: [],
  item: {},
  isLoaded: true,
  isEdit: false,
  jwttoken: ""
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        items: action.payload,
        isLoaded: true
      };
    case ADD_POST:
      let items = [...state.items];
      items.push(action.payload);
      return {
        ...state,
        items,
        isLoaded: true,
        isEdit: false
      };
    case FETCH_POST_BY_ID:
      return {
        ...state,
        item: action.payload,
        isLoaded: true,
        isEdit: true
      };
    // case SET_CURRENT_USER:
    //   return {
    //     ...state,
    //     jwttoken: action.payload,
    //     isLoaded: true,
    //   }
    default:
      return state;
  }
}
