import jwt_decode from "jwt-decode";
export const isLoggedIn = () => {
  const data = JSON.parse(localStorage.getItem("data"));
  if (data && data.token !== null) {
    const { exp } = jwt_decode(data.token);
    let currentTime = Date.now().valueOf() / 1000;

    if (currentTime > exp) {
      window.localStorage.removeItem("data");
      return false;
    }
    return true;
  }
  return false;
};
