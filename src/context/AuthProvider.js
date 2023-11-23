import { createContext, useState } from "react";

const authContext = createContext({});

export const authProvider = ({children}) => {
    const [auth, setAuth] = useState({});

    return (          
        <authContext.Provider value={{auth, setAuth}}>
            {children}
        </authContext.Provider>
    )
};

export default authContext;