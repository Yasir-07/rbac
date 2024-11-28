import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { roles, addRole, updateRole, permissions } from "../constants/mockdata";

const RoleManagement = () => {
  const [roleName, setRoleName] = useState("");
  const [rolePermissions, setRolePermissions] = useState([]);
  const [error, setError] = useState("");

  const handleRoleNameChange = (event) => setRoleName(event.target.value);

  const handlePermissionsChange = (event) => {
    const value = event.target.value;
    setRolePermissions(value);
  };

  const handleSaveRole = () => {
    if (!roleName || rolePermissions.length === 0) {
      setError("Role name and permissions are required");
      return;
    }

    const existingRole = roles.find((role) => role.name === roleName);
    if (existingRole) {
      updateRole(roleName, rolePermissions);
    } else {
      addRole({ name: roleName, permissions: rolePermissions });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Role Management
      </Typography>
      {error && (
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
      )}
      <TextField
        label="Role Name"
        fullWidth
        margin="normal"
        value={roleName}
        onChange={handleRoleNameChange}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Permissions</InputLabel>
        <Select
          multiple
          value={rolePermissions}
          onChange={handlePermissionsChange}
          label="Permissions"
        >
          {permissions.map((permission) => (
            <MenuItem key={permission} value={permission}>
              {permission}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" sx={{ mt: 2 }} onClick={handleSaveRole}>
        Save Role
      </Button>
    </Container>
  );
};

export default RoleManagement;
