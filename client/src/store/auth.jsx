import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {

  const [details, setDetails] = useState("")

  const getDetails = async () => {
    try{
        const response = await fetch("http://localhost:3500/api/data/detail/",{
          method: "GET",

        });

        if(response.ok){
          const data = await response.json()
          // console.log(data.msg)
          setDetails(data.msg)
          // console.log("okay")
        }
    }catch(error){
console.log(`services error: ${error}`)
    }
  }

  useEffect(()=>{
    getDetails();
    // userAuthentication()
  }, [])

  return (
    <AuthContext.Provider value={{ details }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};