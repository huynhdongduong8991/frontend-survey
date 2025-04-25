"use client";

import { AuthContext } from "@/context/auth-context";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import React, { useContext } from "react";

const Header = () => {
  const { logout } = useContext(AuthContext);
  
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Survey Platform
        </Typography>
        <Button color="inherit" onClick={logout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
