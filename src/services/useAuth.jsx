import { useState, useEffect } from "react";

const useAuth = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedIsAdmin = localStorage.getItem("isAdmin");
    const storedUserId = localStorage.getItem("userId");

    if (token) {
      setLoggedIn(true);
      setUserId(storedUserId);
      if (storedIsAdmin === "true") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } else {
      setLoggedIn(false);
      setIsAdmin(false);
      setUserId(null);
    }
  }, []);

  return { loggedIn, isAdmin, userId };
};
export default useAuth;
