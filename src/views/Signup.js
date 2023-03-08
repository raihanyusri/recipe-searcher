import React from 'react'
import { signUp, useAuth, setDisplayName } from '../firebase.js'
import { useRef, useState } from 'react'
import { Header } from '../components/Navbar';
import { StyledInput, StyledPassword, InputContainer, StyledButton, PromptTitle, Prompt, SignUpContainer, LogoImage } from '../components/Fields.js';
import { Link, useNavigate } from 'react-router-dom';
import FavouriteOutlineIcon from '@material-ui/icons/FavoriteBorderOutlined'; 
import { FavouritesHeader } from '../components/Navbar';
import logo from '../img/logo2.png';
import { InputLabel } from '@material-ui/core';

export default function Signup() {
    const [loading, setLoading] = useState(false);
    const currentUser = useAuth();
    let navigate = useNavigate();

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordRef2 = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();

    async function handleSignUp() {
        setLoading(true);
        try {
            if (passwordRef.current.value != passwordRef2.current.value) {
                alert("Passwords do not match!");
            } else {
                await signUp(emailRef.current.value, passwordRef.current.value);
                setDisplayName(firstNameRef.current.value, lastNameRef.current.value);
                navigate("/", { replace: true });
            }
        } catch {
            alert("Error!");
        }
        setLoading(false);
    }

    return (
        <div>
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

            <SignUpContainer>
                <Link to="/home" style={{ textDecoration: 'none', color: 'white'}}>
                    <LogoImage src={logo} style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
                </Link>

                <PromptTitle>{currentUser?.email ? currentUser.email : "Sign up as a user now!"}</PromptTitle>
                <InputContainer>
                    <StyledInput ref={firstNameRef} placeholder="First Name" />
                    <StyledInput ref={lastNameRef} placeholder="Last Name" />
                    <StyledInput ref={emailRef} placeholder="Email" />
                    <StyledPassword ref={passwordRef} type="password" placeholder="Enter password" />
                    <StyledPassword ref={passwordRef2} type="password" placeholder="Enter password again" />
                    <StyledButton disabled={loading || currentUser} onClick={handleSignUp}>Sign Up</StyledButton>
                    <Prompt>Already a user? {!currentUser?.email ? <Link to="/login">Log in</Link> : ""}</Prompt>
                </InputContainer>
            </SignUpContainer>

            {/* <button disabled={loading || currentUser} onClick={handleLogin}>Log In</button>
            <button disabled={loading || !currentUser} onClick={handleLogout}>Logout</button> */}
        </div>
    )
}

