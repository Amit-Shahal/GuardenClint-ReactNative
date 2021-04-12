import React, { useContext, useState } from "react";

const LoginContext = React.createContext();
const UpdateLoginContext = React.createContext();

// JSON - users: Email, Password, ID in DB
export function useLogin() {
  return useContext(LoginContext);
}
export function useUpdateLogin() {
  return useContext(UpdateLoginContext);
}

export default function LoginProvider({ children }) {
  const [LoginData, setLoginData] = useState([]);

  function UpdateLoginData(user) {
    setLoginData(user);
  }

  return (
    <LoginContext.Provider value={LoginData}>
      <UpdateLoginContext.Provider value={UpdateLoginData}>
        {children}
      </UpdateLoginContext.Provider>
    </LoginContext.Provider>
  );
}
