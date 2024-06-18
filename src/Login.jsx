import { useNavigate } from "react-router-dom";
import { UserContext } from "./contexts/UserContext"
import { useContext } from "react";



const Login = ()=> {

    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    const hanndleChange = (event)=> {
        setUser(event.target.value);
    }
    

    const handleSubmit = (event)=> {
        event.preventDefault();
        navigate('/articles')
    }

    return (
        <>
            <section>
                <p>Please log in using the provided username below:</p>
                <p>Username: <strong>'weegembump'</strong></p>
                <form action="" className="login" onSubmit={handleSubmit}>
                    <label htmlFor="login">Enter the username provided above:</label>
                    <input type="text" id='login' onChange={hanndleChange} value={user} required/>
                    <button>Log in</button>
                </form>
            </section>
        </>
    )

}

export default Login;