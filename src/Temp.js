import  { useEffect } from 'react'
import firedb from "./Firebase";
import { useNavigate } from "react-router-dom";

function Temp() {
  const navigate = useNavigate();

  useEffect(() => {
    const key = localStorage.getItem("userKey");

    if (key) {
      firedb.child("Academy").child(key).update({ status: 0 })
        .then(() => {
          localStorage.removeItem("userKey");
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      navigate("/");
    }
  }, [navigate]);

  return null;
}

export default Temp;