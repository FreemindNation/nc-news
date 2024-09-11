import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext"
import { useContext } from "react";
import { Button, TextField, Typography, Container } from "@mui/material";


const Login = ()=> {

    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    const hanndleChange = (event)=> {
        setUser(event.target.value);
    }

    const handleSubmit = (event)=> {
        event.preventDefault();
        setUser(event.target[0].value);
        navigate('/articles')
    }

    return (
        <>
            <Container>
                <Container sx={{height: '80vh', mt: 10}}>
                    <Typography variant="h4">Please log in using the preset username below:</Typography>
                    <p>Username: <strong>'weegembump'</strong></p>
                    <form action="" className="login" onSubmit={handleSubmit}>
                        <TextField
                            type="text"
                            variant="outlined"
                            color="primary"
                            label='Username'
                            fullWidth
                            id='login'
                            onChange={hanndleChange}
                            value={user || 'weegembump'}
                            sx={{mb: 3}}
                
                        />
                        <Button variant="outlined" color="primary" type="submit">Log in</Button>
                    </form>
                </Container>
            </Container>
        </>
    )

}

export default Login;