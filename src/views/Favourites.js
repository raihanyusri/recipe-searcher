import React from 'react';
import { Header, StyledTitle } from '../components/Navbar';
import { StyledButton, LogoPage } from '../components/Fields';
import { useState } from 'react';
import { db, logOut } from '../firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { onSnapshot, collection } from '@firebase/firestore';
import { Link } from 'react-router-dom';
import { RecipeComponent } from './Home';
import { RecipeListContainer } from '../components/RecipeBox';
import { FavouritesHeader, MenuBarContainer, MenuContainer, LogoContainer, StyledWelcome } from '../components/Navbar';
import { PromptTitle, AccessDenied } from '../components/Fields.js'
import logo from '../img/logo2.png';
import bg from '../img/4901718.jpg'

const styles = {
    paperContainer: {
      backgroundImage: 'linear-gradient(rgba(240, 240, 240, 0.9), rgba(240, 240, 240, 0.9)), url(' + bg + ')',
      height: '100%',
      width: '100%',
      minHeight: '100vh',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
      overflowX: 'none',
      overflowY: 'none'
    }
}

function Favourites() {
    const [loading, setLoading] = useState(false);
    const [recipeList, setRecipeList] = useState([]);
    const [currentUser, setCurrentUser] = useState();

    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
    if (user) {
        setCurrentUser(user);
        onSnapshot(collection(db, "users", user.email, "likes"), (snapshot) => {
            setRecipeList(snapshot.docs.map(doc => doc.data()));
        });
    } 
    });


    async function handleLogout() {
        setLoading(true);
        try {
            await logOut();
        } catch {
            alert("Error!");
        }
        setLoading(false);
      }

    return (
        <div style={styles.paperContainer}>
            <Header>
                <MenuContainer>
                <LogoContainer>
                    <Link to="/home" style={{ textDecoration: 'none', color: 'white'}}>
                    <LogoPage src={logo} />
                    </Link>
                </LogoContainer>
                { currentUser?.email ?
                    <StyledWelcome>
                    Hello, {currentUser.email}!
                    </StyledWelcome> : <span></span>
                }
                <MenuBarContainer>
                    {currentUser?.email ? 
                    <FavouritesHeader>
                    <Link to="/favourites" style={{ textDecoration: 'none'}}>
                        <StyledTitle style={{ marginTop: '20px' }}>Favourites</StyledTitle>
                    </Link>
                    </FavouritesHeader> : <div></div>}
                    {currentUser?.email ? 
                    <StyledButton disabled={loading || !currentUser} onClick={handleLogout}>Logout</StyledButton>
                    : <StyledTitle>
                    <Link to="/signup">
                    <StyledButton>Sign Up</StyledButton>
                    </Link>
                    <Link to="/login">
                    <StyledButton>Login</StyledButton>
                    </Link>
                    </StyledTitle>}
                </MenuBarContainer>
                </MenuContainer>
            </Header>
            {currentUser?.email ? <PromptTitle>Your Favourites</PromptTitle> : <AccessDenied>You need to be logged in to view this page!</AccessDenied>}
            <RecipeListContainer>
                {recipeList?.length ? recipeList.map((obj) => (<RecipeComponent recipeItem={obj.recipeObject.recipeItem} user={currentUser} favourited={true}/>)) : <span></span>}
            </RecipeListContainer>
        </div>
    )
}

export default Favourites;
