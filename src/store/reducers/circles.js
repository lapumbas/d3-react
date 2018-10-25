import * as actions from '../actions';

const initialState = {
  circles: []
}

const circles = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_CIRCLE:
      return { ...state, circles: [...state.circles, action.payload] };
    case actions.MOVE_CIRCLES:
      return { ...state, circles: action.payload };

    default:
      return state;
  }
};

export default circles;
