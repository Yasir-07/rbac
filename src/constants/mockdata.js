export const mockUsers = [
  {
    id: 1,
    username: "VRVuser",
    email: "vrvuser@example.com",
    password: "password123",
    phone: "123-456-7890",
    status: "active",
    role: "user",
    permissions: ["read"],
  },
  {
    id: 2,
    username: "VRV",
    email: "vrvadmin@example.com",
    password: "password456",
    phone: "987-654-3210",
    status: "active",
    role: "admin",
    permissions: ["read", "write", "delete"],
  },
];

export const roles = [
  {
    name: "user",
    permissions: ["read"],
  },
  {
    name: "admin",
    permissions: ["read", "write", "delete"],
  },
];

export const permissions = ["read", "write", "delete"];

export const getUsers = () => {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
};

export const saveUsers = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

export const addUser = (newUser) => {
  const currentUsers = getUsers();
  const updatedUsers = [
    ...currentUsers,
    {
      ...newUser,
      id: currentUsers.length + 1,
      permissions: newUser.permissions || [],
    },
  ];
  saveUsers(updatedUsers);
  return updatedUsers;
};
