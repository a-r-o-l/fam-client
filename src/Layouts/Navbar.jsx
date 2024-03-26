import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAccountStore } from "../store/useAccountStore";
import { Button, Typography } from "@mui/material";

export const Navbar = ({ children, nav }) => {
  const account = useAccountStore((x) => x.account);
  const setAccount = useAccountStore((x) => x.setAccount);
  const navigate = useNavigate();

  // console.log(import.meta.env.VITE_APP_SERVER_URL);

  useEffect(() => {
    if (!account) {
      navigate("/login");
    }
  }, [account, navigate]);

  return (
    <div className="flex flex-1 flex-col">
      {nav ? (
        <div className="w-full flex flex-row bg-red-600">
          <div className="flex flex-row w-full justify-evenly py-10 items-center">
            <div className="flex w-1/6 justify-start items-center px-10"></div>
            <div className="flex flex-1 justify-around items-center">
              <Link to="/">
                <a size="5">Home</a>
              </Link>
              <Link to="/buildings">
                <a size="5">Buildings</a>
              </Link>
              <Link to="/renters">
                <a size="5">Renters</a>
              </Link>
              <Link to="/payments">
                <a size="5">Payments</a>
              </Link>
            </div>

            <Button onClick={() => setAccount(null)}>logout</Button>
          </div>
        </div>
      ) : (
        <></>
      )}
      {children}
    </div>
  );
};
