import React from 'react'
import { login, useAuth } from '../firebase.js'
import { useRef, useState } from 'react'
import { Header } from '../components/Navbar';
import { StyledInput, StyledPassword, InputContainer, StyledButton, PromptTitle, Prompt, LoginContainer, LogoImage } from '../components/Fields.js';
import { Link, useNavigate } from 'react-router-dom';
import FavouriteOutlineIcon from '@material-ui/icons/FavoriteBorderOutlined'; 
import { FavouritesHeader } from '../components/Navbar';
import logo from '../img/logo2.png';

export default function Signup() {
    const [loading, setLoading] = useState(false);
    const currentUser = useAuth();
    let navigate = useNavigate();

    const emailRef = useRef();
    const passwordRef = useRef();

    async function handleLogin() {
        setLoading(true);
        try {
            await login(emailRef.current.value, passwordRef.current.value);
            navigate("/", { replace: true });
        } catch {
            alert("Error!");
        }
        setLoading(false);
    }

    return (
        <div style={{ backgroundImage: 'url("/background.jpeg")'}}>
            {/* <Header>
                <Link to="/home" style={{ textDecoration: 'none', color: 'white' }}>
                    CookWhat?
                </Link>
                <FavouritesHeader>
                    <Link to="/favourites" style={{ textDecoration: 'none', color: 'white'}}>
                        <FavouriteOutlineIcon />
                    </Link>
                </FavouritesHeader>
            </Header> */}
            <LoginContainer>
                <Link to="/home" style={{ textDecoration: 'none', color: 'white'}}>
                    <LogoImage src={logo} style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}/>
                </Link>

                <PromptTitle>{currentUser?.email ? "You are logged in as: " + currentUser.email : "Login"}</PromptTitle>
                <InputContainer>
                    <StyledInput ref={emailRef} placeholder="Email" />
                    <StyledPassword ref={passwordRef} type="password" placeholder="Password" />
                    <StyledButton disabled={loading || currentUser} onClick={handleLogin}>Login</StyledButton>
                    <Prompt>Don't have an account? {!currentUser?.email ? <Link to="/signup">Sign Up!</Link> : ""}</Prompt>
                </InputContainer>
            </LoginContainer>

            {/* <button disabled={loading || currentUser} onClick={handleLogin}>Log In</button>
            <button disabled={loading || !currentUser} onClick={handleLogout}>Logout</button> */}
        </div>
    )
}

