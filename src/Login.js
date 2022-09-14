import React, { useState, useRef } from "react";
import jwt_deocde from "jwt-decode";
import { useScript } from "./hooks";
import { CLIENT_ID } from "./ids";

const Login = () => {
  const googlebuttonref = useRef();
  const [user, setuser] = useState(false);
  const onGoogleSignIn = (user) => {
    let userCred = user.credential;
    let payload = jwt_deocde(userCred);
    console.log(payload);
    setuser(payload);
  };

  const handleGoogleSignin = () => {
    window.google.accounts.id.prompt();
  };

  useScript("https://accounts.google.com/gsi/client", () => {
    window.google.accounts.id.initialize({
      client_id: CLIENT_ID, // here's your Google ID
      callback: onGoogleSignIn,
      auto_select: false,
    });

    window.google.accounts.id.renderButton(googlebuttonref.current, {
      size: "medium",
    });
  });
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        // height: "100vh",
      }}
    >
      {!user && <div ref={googlebuttonref}></div>}

      {!user && (
        <div>
          <button onClick={handleGoogleSignin}>My Own Button</button>
        </div>
      )}
      {user && (
        <div>
          <h1>One Tap User info: {user.name}</h1>
          <img src={user.picture} alt="profile" />
          <p>{user.email}</p>

          <button
            onClick={() => {
              setuser(false);
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
