export const getUsersFromLocalStorage = () => {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
};

export const saveUsersToLocalStorage = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};
