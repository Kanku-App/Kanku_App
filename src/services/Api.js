import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {DOMAIN, parseResponse} from './Config';
const authAxios = axios.create();
authAxios.interceptors.request.use(
  async config => {
    let user = await AsyncStorage.getItem('@USER');
    if (user) {
      user = JSON.parse(user);
      config.headers.authorization = `Bearer ${user.access}`;
    }
    if (config.method === 'post' && config.data?.Data) {
      config.data.Data = await config.data.Data;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

authAxios.interceptors.response.use(res => {
  return parseResponse(res.data);
});

export const signup = async postdata => {
  const URL = DOMAIN + 'signup';
  return authAxios.post(URL, postdata);
};

export const login = async postdata => {
  const URL = DOMAIN + 'login';
  return authAxios.post(URL, postdata);
};

export const update_user = async postdata => {
  const URL = DOMAIN + `update-profile/${postdata.user_id}`;
  return authAxios.post(URL, postdata);
};

export const create_tour = async postdata => {
  const headers = {'Content-Type': 'multipart/form-data'};
  const URL = DOMAIN + 'tours/add';
  return authAxios.post(URL, postdata, {
    headers: headers,
  });
};

export const update_tour = async postdata => {
  const headers = {'Content-Type': 'multipart/form-data'};
  const URL = DOMAIN + 'tours/update';
  return authAxios.post(URL, postdata, {
    headers: headers,
  });
};

export const delete_tour = async postdata => {
  const URL = DOMAIN + 'tours/delete';
  return authAxios.post(URL, postdata);
};

export const create_sites = async postdata => {
  const headers = {'Content-Type': 'multipart/form-data'};
  const URL = DOMAIN + 'sites/add';
  return authAxios.post(URL, postdata, {
    headers: headers,
  });
};
export const get_tour_all_byid = async postdata => {
  const URL = DOMAIN + `tours/all?user_id=${postdata}`;
  return authAxios.get(URL);
};
export const get_tour_byid = async postdata => {
  const URL = DOMAIN + `tours/${postdata}`;
  return authAxios.get(URL);
};

export const get_sites_byid = async postdata => {
  const URL = DOMAIN + `sites/all?tours_id=${postdata}`;
  return authAxios.get(URL);
};

export const publish_tour = async postdata => {
  const URL = DOMAIN + `tours/publish/${postdata}`;
  return authAxios.post(URL);
};

export const get_tour_published = async postdata => {
  const URL = DOMAIN + `tours/all/published?user_id=${postdata}`;
  return authAxios.get(URL);
};
export const get_tour_details = async (tour_id, user_id) => {
  const URL = DOMAIN + `tours/${tour_id}?user_id=${user_id}`;
  return authAxios.get(URL);
};

export const get_wish_list = async postdata => {
  const URL = DOMAIN + `wishes/all?user_id=${postdata}`;
  return authAxios.get(URL, postdata);
};

export const add_tour_wish = async postdata => {
  const URL = DOMAIN + 'wishes/add';
  return authAxios.post(URL, postdata);
};

export const remove_tour_wish = async postdata => {
  const URL = DOMAIN + 'wishes/delete';
  return authAxios.post(URL, postdata);
};

export const add_tour_booking = async postdata => {
  const URL = DOMAIN + 'bookings/add';
  return authAxios.post(URL, postdata);
};

export const get_booking_list = async postdata => {
  const URL = DOMAIN + `bookings/all/${postdata}`;
  return authAxios.get(URL);
};

export const add_chat = async postdata => {
  const URL = DOMAIN + 'chats/add';
  return authAxios.post(URL, postdata);
};

export const get_chat = async postdata => {
  console.log('postdata', postdata);
  const URL = DOMAIN + `chats/all/${postdata}`;
  return authAxios.get(URL);
};

export const get_inbox = async postdata => {
  const URL = DOMAIN + `chats/all/${postdata}`;
  return authAxios.get(URL);
};
