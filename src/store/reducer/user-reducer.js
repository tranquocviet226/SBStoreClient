import User from '../model/user-model';
import {CREATE_USER, LOGIN, UPDATE_USER, FETCH_USER, LOGOUT} from '../action/user-action';

const initialState = {
  users: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER:
      const newUser = new User(
        action.users.email,
        action.users.password,
        "",
        action.users.phone,
        "",
        "",
      );
      return {
        users: state.users.concat(newUser),
      };
    case UPDATE_USER:
      const updateUser = new User(
        action.users._id,
        action.users.email,
        action.users.password,
        action.users.fullname,
        action.users.phone,
        action.users.birthday,
        action.users.avatar,
      );
      return {
        ...state,
        users: state.users.concat(updateUser),
      };
    case LOGIN:
      const detailUser = new User(
        action.users._id,
        action.users.email,
        action.users.password,
        action.users.fullname,
        action.users.phone,
        action.users.birthday,
        action.users.avatar,
      );
      return {
        users: state.users.concat(detailUser),
      };
    case FETCH_USER:
      return {
        users: action.users,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
