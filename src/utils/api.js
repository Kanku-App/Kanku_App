import GetStateData from '../components/GetStateData';
import { API_BASE_URL } from './ConstantUrls';

export default api = {
  loginAPI: async (EmailOrMobile, Password, setLoading) => {
    try {
      console.log(
        'for api \n Email or Number - ' +
        EmailOrMobile +
        '\n Password - ' +
        Password,
      );
      const LOGIN_URL = API_BASE_URL + 'login';
      const body = {
        username: EmailOrMobile,
        password: Password,
        country_code: "+91",
        device_id: "nksfjnkfjnfkgjnbnklfgjnKBkjfbkjbJBKbkjbgkj",
        device_type: "android",
        latitude: "22.152",
        longitude: "75.562"
      }
      console.log("LOGIN_URL", LOGIN_URL, body)
      // const body = new FormData();
      // body.append('email_or_phone_no', EmailOrMobile);
      // body.append('password', Password);
      // body.append('country_code', '%2B91');
      // body.append('device_id', 'ssssssssssss');
      // body.append('device_type', 'android');
      // body.append('latitude', '22.5456621');
      // body.append('longitude', '75.21325615');
      // const res = await fetch(LOGIN_URL, {
      //   method: 'POST',
      //   body: body,
      //   headers: { Accept: 'application/json' },
      // });
      // const rslt = await res.json();

      // return rslt;
    } catch (e) {
      setLoading(false);
      // ShowToast('An error occured.', 'error');
      console.log('catch in login - ', e);
    }
  },

  signupAPI: async (FullName, Email, MobileNumber, Password, setLoading) => {
    try {
      const SIGNUP_URL = API_BASE_URL + 'signup';
      const body = {
        "username": "prateek",
        "email": "prateekj@gmail.com",
        "password": "123456",
        "full_name": "rakesh dongre",
        "country_code": "+91",
        "device_id": "nksfjnkfjnfkgjnbnklfgjnKBkjfbkjbJBKbkjbgkj",
        "device_type": "android",
        "mobile": "7000450001",
        "latitude": "22.152",
        "longitude": "75.562"
      }
      console.log("LOGIN_URL", SIGNUP_URL, body)
      const res = await fetch(SIGNUP_URL, {
        method: 'POST',
        body: body,
        headers: { Accept: 'application/json' },
      });
      const rslt = await res.json();
      return rslt;
    } catch (e) {
      setLoading(false);
      console.log('catch in signup api - ', e);
    }
  },

  resetPasswordAPI: async (Email, setLoading) => {
    try {
      console.log(
        'for api \n Email or Number - ' +
        EmailOrMobile +
        '\n Password - ' +
        Password,
      );
      const RESET_PASSWORD_URL = API_BASE_URL + 'password-reset-request';
      const body = new FormData();
      body.append('email', EmailOrMobile);

      const res = await fetch(LOGIN_URL, {
        method: 'POST',
        body: body,
        headers: { Accept: 'application/json' },
      });
      const rslt = await res.json();

      return rslt;
    } catch (e) {
      setLoading(false);
      // ShowToast('An error occured.', 'error');
      console.log('catch in reset pass api - ', e);
    }
  },

  wishListAPI: async (UserId, TourId, setLoading) => {
    try {
      const WISH_LIST_URL = API_BASE_URL + 'wish/get-wish';
      const body = new FormData();
      body.append('user_id', UserId);
      body.append('tour_id', TourId);

      const res = await fetch(WISH_LIST_URL, {
        method: 'POST',
        body: body,
        headers: { Accept: 'application/json' },
      });
      const rslt = await res.json();
      console.log('login api response  -', rslt);
      return rslt;
    } catch (e) {
      setLoading(false);
      // ShowToast('An error occured.', 'error');
      console.log('catch in wishlist api - ', e);
    }
  },

  getTourListAPI: async () => {
    try {
      // const getUserId = state => state?.auth?.data?.id;
      // const userId = await useSelector(getUserId);
      // console.log('state data - ', userId);
      const Token =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNzVhMmE0NjM5NDY1YjMwZTVhYzdmZTNlNjM3MTY3MDdjOWY4YjY0ZTcxZjVhMDBlNjlhMmYxZjI4ZjZhZjIzYzYxODkxOWIzMDZiNTY5N2IiLCJpYXQiOjE2OTkzMzcxMzguNjEyMDYxOTc3Mzg2NDc0NjA5Mzc1LCJuYmYiOjE2OTkzMzcxMzguNjEyMDc2MDQ0MDgyNjQxNjAxNTYyNSwiZXhwIjoxNzMwOTU5NTM4LjYxMDkwMzAyNDY3MzQ2MTkxNDA2MjUsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.EGFoFqJivL1SWeQ4TJWNK_a2T0Z8b9NEksHQFVkNK3VQJ2GioVx2UK3PIQxFvOE9Wx7e7JwlevZNxT3I1IoxlXI5QEwyR1BkxBY1zQ4J7iXxxStraAD66YB7ARmmyPxn6pleO-KL1B3ln2Uu0U-3LotZ1j_xgkGlCE3IwtCycdI9I_WiZrYSngqOf2DfGJl6ix6hl1rsLtiljlJGT3J0rMpGoxLGjpcR7sSDl32n13O7YT1jzBV0xvc4QXAxwvRDeulyF4zgEFN-uOmNTeWcQ1IxvST00AEqGCYyMY8BLccbZ2_faFevfsRXqJ64trkftU8Rtcna3PFD7SkbPhgZOKuIqG6PygVlNEQXBClP3Ty5B-gGDbTutn_9gaSBh6Lyu-k65KBW8YasTv8dzFpuKi6ACHI-RXC-_ymOnGzXpLq5X71H6b97l59TBVYnN-lLB9ncZ8PqutdCxTSSo16mIxycBPtw0lR9qSMvQnnd16hcdFDzqleKEaJqjfcjXt_HHcOQ0E-iR8H0rNwb9O-MGn-qeHRlEl_uvv6oxL3VDIJJezzpJy8nU0zsHFZWTynOzAcxZmoJKag8hSjeArFGI_3iTCn_0Lzhszmf1L86hrgpYbC5Lpv00c3QjZVsmummP9NGNqxGZYGdF44Qr82mDmhG3Z0YYkQ7bIPeLdU7iXE';
      const TOUR_LIST_URL = API_BASE_URL + 'tour/get-tour';
      const body = new FormData();
      body.append('user_id', '1');
      const res = await fetch(TOUR_LIST_URL, {
        method: 'POST',
        body: body,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${Token}`,
        },
      });
      const rslt = await res.json();
      console.log('tour api response  -', rslt);
      return rslt;
    } catch (e) {
      setLoading(false);
      // ShowToast('An error occured.', 'error');
      console.log('catch in Tour List api - ', e);
    }
  },

  getTourCategoryAPI: async () => {
    try {
      const Token =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNzVhMmE0NjM5NDY1YjMwZTVhYzdmZTNlNjM3MTY3MDdjOWY4YjY0ZTcxZjVhMDBlNjlhMmYxZjI4ZjZhZjIzYzYxODkxOWIzMDZiNTY5N2IiLCJpYXQiOjE2OTkzMzcxMzguNjEyMDYxOTc3Mzg2NDc0NjA5Mzc1LCJuYmYiOjE2OTkzMzcxMzguNjEyMDc2MDQ0MDgyNjQxNjAxNTYyNSwiZXhwIjoxNzMwOTU5NTM4LjYxMDkwMzAyNDY3MzQ2MTkxNDA2MjUsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.EGFoFqJivL1SWeQ4TJWNK_a2T0Z8b9NEksHQFVkNK3VQJ2GioVx2UK3PIQxFvOE9Wx7e7JwlevZNxT3I1IoxlXI5QEwyR1BkxBY1zQ4J7iXxxStraAD66YB7ARmmyPxn6pleO-KL1B3ln2Uu0U-3LotZ1j_xgkGlCE3IwtCycdI9I_WiZrYSngqOf2DfGJl6ix6hl1rsLtiljlJGT3J0rMpGoxLGjpcR7sSDl32n13O7YT1jzBV0xvc4QXAxwvRDeulyF4zgEFN-uOmNTeWcQ1IxvST00AEqGCYyMY8BLccbZ2_faFevfsRXqJ64trkftU8Rtcna3PFD7SkbPhgZOKuIqG6PygVlNEQXBClP3Ty5B-gGDbTutn_9gaSBh6Lyu-k65KBW8YasTv8dzFpuKi6ACHI-RXC-_ymOnGzXpLq5X71H6b97l59TBVYnN-lLB9ncZ8PqutdCxTSSo16mIxycBPtw0lR9qSMvQnnd16hcdFDzqleKEaJqjfcjXt_HHcOQ0E-iR8H0rNwb9O-MGn-qeHRlEl_uvv6oxL3VDIJJezzpJy8nU0zsHFZWTynOzAcxZmoJKag8hSjeArFGI_3iTCn_0Lzhszmf1L86hrgpYbC5Lpv00c3QjZVsmummP9NGNqxGZYGdF44Qr82mDmhG3Z0YYkQ7bIPeLdU7iXE';
      const TOUR_CATEGORY_URL = API_BASE_URL + 'city/get-city';
      const body = new FormData();

      const res = await fetch(TOUR_CATEGORY_URL, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${Token}`,
        },
      });
      const rslt = await res.json();
      console.log('tour category api response  -', rslt);
      return rslt;
    } catch (e) {
      console.log('catch in tour category - ', e);
    }
  },
};
