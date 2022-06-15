import React from 'react';
import { Header, StyledTitle } from '../components/Navbar';
import { StyledButton } from '../components/Fields';
import { useState } from 'react';
import { db, useAuth, logOut } from '../firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, onSnapshot, collection } from '@firebase/firestore';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RecipeComponent } from './Home';
import { RecipeListContainer, RecipeImage } from '../components/RecipeBox';
import FavouriteOutlineIcon from '@material-ui/icons/FavoriteBorderOutlined'; 
import FavouriteFilledIcon from '@material-ui/icons/FavoriteOutlined'; 
import { FavouritesHeader } from '../components/Navbar';
import { PromptTitle } from '../components/Fields.js'

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
    } else {
        // User is signed out
        // ...
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
                {currentUser?.email ? 
                <StyledTitle>
                    Logged in as: {currentUser.email}
                    <StyledButton disabled={loading || !currentUser} onClick={handleLogout}>Logout</StyledButton>
                </StyledTitle>
                : <StyledTitle>
                <Link to="/signup">
                    <StyledButton>Sign Up</StyledButton>
                </Link>
                <Link to="/login">
                    <StyledButton>Login</StyledButton>
                </Link>
                </StyledTitle>}
            </Header>
                <PromptTitle>Your Favourites</PromptTitle>
            <RecipeListContainer>
                {recipeList?.length ? recipeList.map((obj) => (<RecipeComponent recipeItem={obj.recipeObject.recipeItem} user={currentUser} favourited={true}/>)) : <span></span>}
            </RecipeListContainer>
        </div>
    )
}

export default Favourites;
