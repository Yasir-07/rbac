import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
Container,
Button,
Modal,
TextField,
Box,
Typography,
Grid,
FormControl,
InputLabel,
Select,
MenuItem,
IconButton,
} from "@mui/material";
import Close from "@mui/icons-material/Close";
import { addUser } from "../constants/mockdata";
import { getUsers, saveUsers } from "../constants/mockdata";

const AdminPage = () => {
const [openModal, setOpenModal] = useState(false);
const [formValues, setFormValues] = useState({
username: "",
email: "",
phone: "",
status: "active",
role: "user",
});
const [selectedUser, setSelectedUser] = useState(null);
const [userData, setUserData] = useState([]);
const [rolePermissions, setRolePermissions] = useState([]);
const [currentUserRole, setCurrentUserRole] = useState("user");

useEffect(() => {
const storedUserData = getUsers();
if (storedUserData) {
setUserData(storedUserData);
}

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
setCurrentUserRole(loggedInUser?.role || "user");
}, []);

const handleOpenModal = (mode, user = null) => {
setOpenModal(true);
if (mode === "edit" && user) {
setSelectedUser(user);
setFormValues({ ...user });
setRolePermissions(user.permissions || []);
} else {
setFormValues({
username: "",
email: "",
phone: "",
status: "active",
role: "user",
});
setRolePermissions([]);
}
};

const handleCloseModal = () => setOpenModal(false);

const handleDeleteUser = (id) => {
const updatedUsers = userData.filter((user) => user.id !== id);
setUserData(updatedUsers);
saveUsers(updatedUsers);
};

const handleSave = () => {
let updatedUsers;
const updatedUser = {
...formValues,
permissions: rolePermissions,
};

if (selectedUser) {
updatedUsers = userData.map((user) =>
user.id === selectedUser.id ? { ...user, ...updatedUser } : user
);
} else {
updatedUsers = addUser(updatedUser);
}

setUserData(updatedUsers);
saveUsers(updatedUsers);
setOpenModal(false);
setSelectedUser(null);
};

const columns = [
{
field: "id",
headerName: "ID",
width: 90,
},
{
field: "username",
headerName: "Username",
width: 150,
},
{
field: "email",
headerName: "Email",
width: 200,
},
{
field: "phone",
headerName: "Phone",
width: 150,
},
{
field: "status",
headerName: "Status",
width: 120,
cellClassName: (params) =>
params.value === "active" ? "status-active" : "status-inactive",
},
{
field: "role",
headerName: "Role",
width: 120,
cellClassName: (params) =>
params.value === "admin" ? "role-admin" : "role-user",
},
{
field: "actions",
headerName: "Actions",
width: 220,
sortable: false,
renderCell: (params) => (
<Box
display="flex"
justifyContent="space-between"
alignItems="center"
sx={{
padding: "5px 10px",
gap: 2,
width: "100%",
backgroundColor: "#f5f5f5",
borderRadius: "8px",
}}
>
<Button
variant="contained"
size="small"
color="primary"
sx={{
textTransform: "capitalize",
padding: "4px 12px",
fontWeight: "bold",
}}
onClick={() => handleOpenModal("edit", params.row)}
>
Edit
</Button>
{currentUserRole === "admin" && (
<Button
variant="contained"
size="small"
color="error"
sx={{
textTransform: "capitalize",
padding: "4px 12px",
fontWeight: "bold",
}}
onClick={() => handleDeleteUser(params.row.id)}
>
Delete
</Button>
)}
</Box>
),
},
];

return (
<Container sx={{ mt: 4 }}>
<Typography variant="h4" gutterBottom align="center" sx={{ mb: 3 }}>
Admin Dashboard
</Typography>
{currentUserRole === "admin" && (
<Button
variant="contained"
color="primary"
onClick={() => handleOpenModal("add")}
sx={{ mb: 3 }}
>
Add User
</Button>
)}

<div style={{ height: 400, width: "100%" }}>
<DataGrid rows={userData} columns={columns} pageSize={5} />
</div>

<Modal open={openModal} onClose={handleCloseModal}>
<Box
sx={{
position: "relative",
padding: "20px",
maxWidth: "500px",
margin: "auto",
background: "#fff",
marginTop: "50px",
borderRadius: "8px",
boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
}}
>
<IconButton
onClick={handleCloseModal}
sx={{
position: "absolute",
top: 10,
right: 10,
color: "gray",
}}
>
<Close />
</IconButton>

<Typography variant="h6" align="center" gutterBottom>
{selectedUser ? "Edit User" : "Add User"}
</Typography>

<Grid container spacing={3}>
<Grid item xs={12}>
<TextField
label="Username"
fullWidth
value={formValues.username}
onChange={(e) =>
setFormValues({ ...formValues, username: e.target.value })
}
variant="outlined"
/>
</Grid>
<Grid item xs={12}>
<TextField
label="Email"
fullWidth
value={formValues.email}
onChange={(e) =>
setFormValues({ ...formValues, email: e.target.value })
}
variant="outlined"
/>
</Grid>
<Grid item xs={12}>
<TextField
label="Phone"
fullWidth
value={formValues.phone}
onChange={(e) => {
const value = e.target.value;
if (/^\d{0,10}$/.test(value)) {
setFormValues({ ...formValues, phone: value });
}
}}
variant="outlined"
inputProps={{ maxLength: 10 }}
/>
</Grid>

<Grid item xs={12}>
<FormControl fullWidth sx={{ mb: 2 }}>
<InputLabel>Status</InputLabel>
<Select
value={formValues.status}
onChange={(e) =>
setFormValues({ ...formValues, status: e.target.value })
}
>
<MenuItem value="active">Active</MenuItem>
<MenuItem value="inactive">Inactive</MenuItem>
</Select>
</FormControl>
</Grid>
<Grid item xs={12}>
<FormControl fullWidth sx={{ mb: 2 }}>
<InputLabel>Role</InputLabel>
<Select
value={formValues.role}
onChange={(e) =>
setFormValues({ ...formValues, role: e.target.value })
}
>
<MenuItem value="user">User</MenuItem>
<MenuItem value="admin">Admin</MenuItem>
</Select>
</FormControl>
</Grid>
<Grid item xs={12} display="flex" justifyContent="center">
<Button variant="contained" color="primary" onClick={handleSave}>
Save
</Button>
</Grid>
</Grid>
</Box>
</Modal>
</Container>
);
};

export default AdminPage;
