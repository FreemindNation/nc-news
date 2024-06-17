import { createContext, useState } from "react";

export const Usercontext = createContext();

export const UserProvider= ({ children })=> {
    const [user, setUser] = useState('');

    return (
        <Usercontext.Provider value={{ user, setUser }}>
            { children }
        </Usercontext.Provider>
    )
}