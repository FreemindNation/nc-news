import { useState, useEffect } from "react";
import { getTopics } from "../utils/api-calls";


const NavBar = ()=> {

    const [topics, setTopics] = useState([]);
    

    useEffect(()=> {
        setIsLoading(true);
        getTopics()
        .then((res)=> {
        })
    }, [])


    return (
       <nav>
        
       </nav>
    )


}


export default NavBar;