"use client";

import { AuthContext } from "@/context/auth-context";
import { ROUTES } from "@/utility/constants";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

const Header = () => {
  const router = useRouter();
  const { logout, setLoading } = useContext(AuthContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, "&:hover": { cursor: "pointer" } }}
          onClick={() => {
            router.push(ROUTES.HOME);
            setLoading(false);
          }}
        >
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
