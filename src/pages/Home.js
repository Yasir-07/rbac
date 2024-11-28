import React from "react";
import { Typography, Button, Container, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { currentUser, logout } = useAuth();

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Box sx={{ textAlign: "center", padding: 2 }}>
        {currentUser ? (
          <>
            <Typography variant="h4" gutterBottom color="primary">
              Welcome, {currentUser.username}!
            </Typography>
            <Typography variant="h6" color="textSecondary">
              Role: {currentUser.role}
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
              Email: {currentUser.email}
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
              Phone: {currentUser.phone}
            </Typography>

            {currentUser.role === "admin" && (
              <Box sx={{ mt: 3 }}>
                <Link to="/admin">
                  <Button
                    variant="outlined"
                    sx={{ px: 4, py: 1, fontWeight: "bold", mt: 2 }}
                  >
                    Go to Admin Panel
                  </Button>
                </Link>
              </Box>
            )}
            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={logout}
                sx={{ px: 4, py: 1 }}
              >
                Logout
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Typography variant="h4" gutterBottom color="primary">
              Please Login
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Link to="/login">
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ px: 4, py: 1 }}
                >
                  Login
                </Button>
              </Link>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
};

export default Home;
