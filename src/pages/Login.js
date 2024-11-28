import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Container, Link } from "@mui/material";
import { mockUsers } from "../constants/mockdata";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      navigate("/home");
    }
  }, [navigate]);

  const handleLogin = () => {
    const user = mockUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (!user) {
      setError("Invalid email or password");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));
    setCurrentUser(user);
    navigate("/home");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      {error && (
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
      )}
      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleLogin}
      >
        Login
      </Button>
      <Typography sx={{ mt: 2, textAlign: "center" }}>
        Not registered?{" "}
        <Link href="/signup" underline="hover">
          Sign up here
        </Link>
      </Typography>
    </Container>
  );
};

export default Login;
