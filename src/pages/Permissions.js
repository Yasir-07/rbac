import React from "react";
import {
  Button,
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { roles, permissions } from "../constants/mockdata";

const Permissions = ({ roleName, onPermissionsChange }) => {
  const role = roles.find((role) => role.name === roleName);

  const handlePermissionChange = (event) => {
    onPermissionsChange(event.target.value);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Manage Permissions for {roleName}
      </Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel>Permissions</InputLabel>
        <Select
          multiple
          value={role ? role.permissions : []}
          onChange={handlePermissionChange}
          renderValue={(selected) => selected.join(", ")}
        >
          {permissions.map((permission) => (
            <MenuItem key={permission} value={permission}>
              <Checkbox checked={role?.permissions.indexOf(permission) > -1} />
              <ListItemText primary={permission} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" sx={{ mt: 2 }}>
        Save Permissions
      </Button>
    </Container>
  );
};

export default Permissions;
