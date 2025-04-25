"use client";

import Loading from "@/components/Loading";
import { AuthContext } from "@/context/auth-context";
import { useContext } from "react";

const HomePage = () => {
  const { loading, logout } = useContext(AuthContext);

  return (
    <>
      {!loading ? (
        <Loading />
      ) : (
        <div>
          Hello my friends
          <form action={logout}>
            <button type="submit">Sigout with Google</button>
          </form>
        </div>
      )}
    </>
  );
};

export default HomePage;
