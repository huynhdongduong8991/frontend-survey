"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  TextField,
  Box,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";
import GoogleIcon from '@mui/icons-material/Google'

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string(),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login, googleLogin } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    const { email, password } = data;
    await login({ email, password });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ maxWidth: 400, mx: "auto", mt: 8 }}
    >
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>

      <TextField
        label="Email"
        fullWidth
        margin="normal"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Login
      </Button>

      <Button
        variant="outlined"
        fullWidth
        startIcon={<GoogleIcon />}
        onClick={googleLogin}
        sx={{
          mt: 2,
          py: 1.5,
          backgroundColor: "white",
          color: "#00000091",
          borderRadius: 2,
          borderColor: "#00000091",
          "&:hover": {
            backgroundColor: "#357ae8",
            color: "white",
            borderColor: "#357ae8",
          },
          fontWeight: "bold",
        }}
      >
        Sign in with Google
      </Button>

      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Don&apos;t have an account?{" "}
        <MuiLink component={Link} href="/register">
          Register
        </MuiLink>
      </Typography>
    </Box>
  );
}
