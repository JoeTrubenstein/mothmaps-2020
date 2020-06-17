import axios from "axios"

const token = axios
  .post(
    "https://realm.mongodb.com/api/client/v2.0/app/mothmaps-kicwt/auth/providers/api-key/login",
    { key: process.env.REACT_APP_SIGHT_KEY }
  )
  .then((res) => {
    console.log("token refreshed");
    localStorage.setItem('token', res.data.access_token)
  })
  .catch((err) => {
    console.log(err);
  });

export default token;
