export const Logout = (history) => {
  history.push("/login");
  // localStorage.removeItem("data");
  localStorage.clear();
};
