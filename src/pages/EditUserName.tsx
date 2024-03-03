import React, { useEffect, useState } from "react";
import { GContext } from "../globalcontext";
import { ContextType } from "../globalcontext";
import Navbar from "../components/navbar";
import * as API from "../networks/postapi";
import { useNavigate } from "react-router-dom";

const RAS = () => {
  const { setUser, user } = React.useContext(GContext) as ContextType;
  const Navigate = useNavigate();
  useEffect(() => {
    async function fetchUser() {
      try {
        const Userx = await API.getAuthUser();
        setUser(Userx);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUser();
  }, []);
  

  let y;
  if (!user) y = "abc";
  else y = user.username;

  const [x, setX] = useState(y);
  
  const reqbody: API.EditUserType = {
    username: x,
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setX(e.target.value);
  };
  async function editUsername(z: API.EditUserType) {
    try {
      const res = await API.EditUser(z);
      setX(res.username);
      setUser({
        username: x,
        reg_seller: res.reg_seller,
      });
    } catch (error) {
      console.error(error);
    }
  }
  

  
  const EditUser = () => {
    editUsername(reqbody);
  };

  return (
    <>
      <Navbar />
      <h1 className="h1-general">Welcome {user?.username}</h1>
      <div className="ras-center">
        <input
          className="abc"
          value={x}
          type="text"
          name="username"
          id="1"
          onChange={handleInputChange}
        />

        <button className="btn change-btn" onClick={EditUser}>
          Change Username
        </button>
        <button className="btn change-btn" onClick={()=>Navigate('/register')}>
          Regitser as a Seller
        </button>
      </div>
    </>
  );
};

export default RAS;
