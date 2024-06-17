const Login = ()=> {

    return (
        <>
            <section>
                <p>Please log in using the provided username below:</p>
                <p>Username: <strong>'weegembump'</strong></p>
                <form action="" className="login">
                    <label htmlFor="login">Enter the username provided above:</label>
                    <input type="text" id='login' />
                    <button>Log in</button>

                </form>
            </section>
        </>
    )

}

export default Login;