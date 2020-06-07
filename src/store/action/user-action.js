import User from '../model/user-model';
import * as url from '../../url/url'

export const CREATE_USER = 'CREATE_USER';
export const LOGIN = 'LOGIN';
export const FETCH_USER = 'FETCH_USER';
export const DELETE_USER = 'DELETE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const LOGOUT = 'LOGOUT';

export const fetchUser = email => {
  return async dispatch => {
    const response = await fetch(
      `${url.url}userRn/fetchUser?email=${email}`,
    );
    const json = await response.json();
    const loadUser = [];
    loadUser.push(
      new User(
        json._id,
        json.email,
        json.password,
        json.fullname,
        json.phone,
        json.birthday,
        json.avatar,
      ),
    );
    dispatch({
      type: FETCH_USER,
      users: loadUser,
    });
  };
};

export const createUser = (email, password, phone) => {
  return async dispatch => {
    const response = await fetch(
      `${url.url}userRn/signUp?email=${email}&password=${password}&phone=${phone}`,
    );

    if (!response.ok) {
      throw new Error('Email đã được đăng kí!');
    }
    await response.json();
    dispatch({
      type: CREATE_USER,
      users: {
        email,
        password,
        phone,
      },
    });
  };
};

export const updateInfo = (
  _id,
  email,
  password,
  fullname,
  phone,
  birthday,
  avatar,
) => {
  return async dispatch => {
    const response = await fetch(
      `${url.url}userRn/updateInfo?id=${_id}&password=${password}&fullname=${fullname}&phone=${phone}&birthday=${birthday}`,
    );

    if (!response.ok) {
      throw new Error('Có gì đó sai!');
    }

    await response.json();
    dispatch({
      type: UPDATE_USER,
      users: {
        _id,
        email,
        password,
        fullname,
        phone,
        birthday,
        avatar,
      },
    });
  };
};

export const updateUser = (
  email,
  password,
  fullname,
  phone,
  birthday,
  avatar,
) => {
  return async dispatch => {
    const response = await fetch(
      `${url.url}updateUser/updateInfomation?email=${email}&password=${password}&fullname=${fullname}&phone=${phone}&birthday=${birthday}&avatar=${avatar}`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
      },
    );

    if (!response.ok) {
      throw new Error('Có gì đó sai!');
    }

    await response.json();
    dispatch({
      type: UPDATE_USER,
      users: {
        username,
        password,
        fullname,
        phone,
        email,
        birthday,
        avatar,
      },
    });
  };
};

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      `${url.url}userRn/checkLogin?email=${email}&password=${password}`,
    );
    if (!response.ok) {
      throw new Error('Tài khoản hoặc mật khẩu không đúng!');
    }
    
    const json = await response.json();
    dispatch({
      type: LOGIN,
      users: {
        _id: json._id,
        email,
        password,
        fullname: json.fullname,
        phone: json.phone,
        birthday: json.birthday,
        avatar: json.avatar,
      },
    });
  };
};

export const logout = () => {
  return {type: LOGOUT};
};
