import { useScript } from "./hooks";
import { useRef, useState } from "react";
import axios from "axios";

const Auth = () => {
  const googleOauthRef = useRef();
  const [user, setUser] = useState(false);

  const handleOauth = async () => {
    const tokenResponse = await new Promise((resolve, reject) => {
      try {
        // Settle this promise in the response callback for requestAccessToken()
        googleOauthRef.current.callback = (resp) => {
          if (resp.error !== undefined) {
            reject(resp);
          }

          // console.log("client resp",resp);
          resolve(resp);
        };
        // console.log("client",client);
        googleOauthRef.current.requestAccessToken({ prompt: "consent" });
      } catch (err) {
        console.log(err);
      }
    });
    console.log(tokenResponse);

    const userInfo = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
    );

    console.log(userInfo);

    setUser(userInfo.data);
  };

  useScript("https://accounts.google.com/gsi/client", () => {
    googleOauthRef.current = window.google.accounts.oauth2.initTokenClient({
      client_id:
        "685280315987-pl939akl077dgaek83e97mu29cjd8ctb.apps.googleusercontent.com",
      scope: `profile email`,
      callback: "", // defined at request time
    });
  });

  return (
    <div>
      {user && <p>Oauth2 user info: {user.name}</p>}
      <button onClick={handleOauth}>Client Oauth2</button>
    </div>
  );
};

export default Auth;
