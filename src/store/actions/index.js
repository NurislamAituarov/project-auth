import { httpClient } from '../../api/httpClient';

export const registerSuccessfully = (value) => ({ type: 'SUCCESS', payload: value });
export const setUser = (user) => ({ type: 'SET_USER', payload: user });
export const logOut = () => ({ type: 'LOG_OUT' });

export const auth = () => {
  return async (dispatch) => {
    try {
      const response = await httpClient.get(`${process.env.REACT_APP_API_BASE_URL}/auth/auth`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      dispatch(setUser(response.data.user));
      localStorage.setItem('token', response.data.token);
    } catch (e) {
      dispatch(logOut());
      localStorage.removeItem('token');
    }
  };
};
