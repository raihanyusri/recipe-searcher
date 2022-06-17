import React from 'react'
import { signUp, login, logOut, useAuth } from '../firebase.js'
import { useRef, useState } from 'react'
import { Header } from '../components/Navbar';
import { StyledInput, StyledPassword, InputContainer, StyledButton, PromptTitle, Prompt } from '../components/Fields.js';
import { Link, useNavigate } from 'react-router-dom';
import FavouriteOutlineIcon from '@material-ui/icons/FavoriteBorderOutlined'; 
import { FavouritesHeader } from '../components/Navbar';

export default function Signup() {
    const [loading, setLoading] = useState(false);
    const currentUser = useAuth();

    const emailRef = useRef();
    const passwordRef = useRef();

    async function handleSignUp() {
        setLoading(true);
        try {
            await signUp(emailRef.current.value, passwordRef.current.value);
            navigate("/", { replace: true });
        } catch {
            alert("Error!");
        }
        setLoading(false);
    }

    async function handleLogin() {
        setLoading(true);
        try {
            await login(emailRef.current.value, passwordRef.current.value);
        } catch {
            alert("Error!");
        }
        setLoading(false);
    }

    async function handleLogout() {
        setLoading(true);
        try {
            await logOut();
            passwordRef.current.value = "";
        } catch {
            alert("Error!");
        }
        setLoading(false);
    }

    return (
        <div>
            <Header>
                <Link to="/home" style={{ textDecoration: 'none', color: 'white' }}>
                    CookWhat?
                </Link>
                <FavouritesHeader>
                    <Link to="/favourites" style={{ textDecoration: 'none', color: 'white'}}>
                        <FavouriteOutlineIcon />
                    </Link>
                </FavouritesHeader>
            </Header>

            <PromptTitle>{currentUser?.email ? currentUser.email : "Sign up as a user now!"}</PromptTitle>
            <InputContainer>
                <StyledInput ref={emailRef} placeholder="Email" />
                <StyledPassword ref={passwordRef} type="password" placeholder="Password" />
                <StyledButton disabled={loading || currentUser} onClick={handleSignUp}>Sign Up</StyledButton>
                <Prompt>Already a user? {!currentUser?.email ? <Link to="/login">Log in</Link> : ""}</Prompt>
            </InputContainer>

            {/* <button disabled={loading || currentUser} onClick={handleLogin}>Log In</button>
            <button disabled={loading || !currentUser} onClick={handleLogout}>Logout</button> */}
        </div>
    )
}

