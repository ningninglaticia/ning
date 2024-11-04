import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const MyDocuments = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get("/get-user");
        if (response.data && response.data.user) {
          setUserInfo(response.data.user);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          localStorage.clear();
          navigate("/login");
        } else {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserInfo();
  }, [navigate]);

  return (
    <>
      <Navbar userInfo={userInfo} />
      <div>MyDocuments</div>
    </>
  );
};

export default MyDocuments;
