import React from "react";
import style from "./style.module.css";
import { useAuth } from "../../context/AuthContext";
function About() {
  const { user } = useAuth();

  return (
    <div className={style.About}>
      About <br />
      {user && (
        <div>
          {" "}
          Email:{user.email} <br /> Role:{user.role}
        </div>
      )}
    </div>
  );
}

export default About;
