import React, { useState } from "react";
import { TextField, Button, Typography, Container, Link } from "@mui/material";
import { addUser, mockUsers } from "../constants/mockdata";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const handleSignup = () => {
    if (!username || !password || !email || !phone) {
      setError("All fields are required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }

    if (!validatePhone(phone)) {
      setError("Invalid phone number format");
      return;
    }

    const userExists = mockUsers.some((user) => user.username === username);
    if (userExists) {
      setError("Username already exists");
      return;
    }

    const newUser = {
      username,
      password,
      email,
      phone,
      role: "user",
      status: "active",
    };
    addUser(newUser);

    localStorage.setItem("loggedInUser", JSON.stringify(newUser));
    navigate("/login");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Signup
      </Typography>
      {error && (
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
      )}
      <TextField
        label="Username"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Phone Number"
        fullWidth
        margin="normal"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleSignup}
      >
        Signup
      </Button>
      <Typography sx={{ mt: 2, textAlign: "center" }}>
        Already have an account?{" "}
        <Link href="/login" underline="hover">
          Login here
        </Link>
      </Typography>
    </Container>
  );
};

export default Signup;
