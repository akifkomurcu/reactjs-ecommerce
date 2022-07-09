import React from "react";
import { useAuth } from "../../context/AuthContext";
function About() {
  const { user } = useAuth();
  console.log("user", user);
  return (
    <div>
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
