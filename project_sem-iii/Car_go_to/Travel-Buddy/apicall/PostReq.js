import axios from 'axios';

export const PostRequestCall = async (apiPath, payload, token, formData) => {
  let auth = {};
  if (typeof token !== 'undefined' && token !== null && token !== '') {
    auth = {
      Authorization: `Bearer ${token}`,
    };
  }
  let headers = {
    ...auth,
    Accept: 'application/json',
    'Content-Type': formData ? 'multipart/form-data' : 'application/json',
  };
  const postResponse = await axios
    .post(`http://192.168.84.70:5000/${apiPath}`, payload, {
      headers: headers,
    })
    .then(function (result) {
      return result;
    })
    .catch(err => err.response);
  return postResponse;
};
