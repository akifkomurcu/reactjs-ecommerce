import React from "react";
import style from "./style.module.css";
import { useAuth } from "../../context/AuthContext";
function About() {
  const { user } = useAuth();

  return (
    <div className={style.About}>
      {user && (
        <div className={style.AboutArea}>
          {" "}
          <div>
            Email
            <hr style={{ width: "100px" }} />
            {user.email}
          </div>
          <div className={style.AboutAreaRole}>
            Role <hr style={{ width: "100px" }} />
            {user.role}
          </div>
        </div>
      )}
    </div>
  );
}

export default About;
