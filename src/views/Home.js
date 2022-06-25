import styled from 'styled-components'
import { makeStyles } from '@material-ui/styles'
import SearchIcon from '@material-ui/icons/Search'; 
import FavouriteOutlineIcon from '@material-ui/icons/FavoriteBorderOutlined'; 
import FavouriteFilledIcon from '@material-ui/icons/FavoriteOutlined'; 
import axios from 'axios';
import { Header, StyledTitle, MenuContainer, FavouritesHeader, LogoContainer, MenuBarContainer, StyledWelcome } from '../components/Navbar';
import { SearchBar, SearchInput } from '../components/SearchBar';
import { Spacing, TickList, RecipeListContainer, RecipeContainer, RecipeBody, RecipeImage, RecipeTitle, RecipeNutritionContainer, RecipeMiniHeader, RecipeDietLabels, RecipeHealthLabels, ViewFullRecipeLink } from '../components/RecipeBox';
import { useState, useEffect } from 'react';
import { IconButton, StylesProvider } from '@material-ui/core';
import { logOut, useAuth, db } from '../firebase.js'
import { PromptTitle, StyledButton, LogoPage } from '../components/Fields';
import { Link, useNavigate } from 'react-router-dom';
import { collection, addDoc, onSnapshot } from '@firebase/firestore';
import bg from '../img/4901718.jpg'
import logo from '../img/logo2.png';

const APP_ID = "7fa7fd18";
const APP_KEY = "ddde9a126cf34301389593363e8315aa";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const useClasses = makeStyles(theme => ({
  icon: {
    "&:hover": {
      transform: "scale(1.5)",
      cursor: "pointer"
    }
  }
}))

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


export const RecipeComponent = (props) => {
  const [clicked, setClicked] = useState(false);
  const [recipeFavs, setRecipeFavs] = useState([]);
  const [inFavourites, setInFavourites] = useState(false);
  const { recipeItem, user, favourited } = props;
  const classes = useClasses();
  const emailString = user?.email;
  let navigate = useNavigate();

  const addToFavourites = async(recipeObject) => {
    if (user) {
      setClicked(true);
      await addDoc(collection(db,"users", user.email, "likes"), {recipeObject});
    }
    else {
      navigate("/login");
    }
  }

  useEffect(
    () =>
    onSnapshot(collection(db, "users", (emailString ? emailString : "testing@gmail.com"), "likes"), (snapshot) => {
      setRecipeFavs(snapshot.docs.map(doc => doc.data().recipeObject.recipeItem.recipe.label));
      if (recipeFavs.indexOf(recipeItem.recipe.label) !== -1) {
        setInFavourites(true);
      }
    })
  );

  return (
    <RecipeContainer>
      <RecipeTitle>{recipeItem.recipe.label}</RecipeTitle>
      <RecipeBody>
        <RecipeImage src={recipeItem.recipe.image} />
        <RecipeNutritionContainer>
          <RecipeDietLabels>{recipeItem.recipe.dietLabels.length ? 
            recipeItem.recipe.dietLabels.map((label) => <TickList><Spacing>{label}</Spacing></TickList>) : <span></span>}</RecipeDietLabels>
          <RecipeHealthLabels>{recipeItem.recipe.healthLabels.length ? 
              recipeItem.recipe.healthLabels.map(function(label, index) {
                return <span>{ (index ? ', ' : '') + label}</span>
              }) : <br></br>}</RecipeHealthLabels>
          <br></br>
          <RecipeMiniHeader>{Math.ceil((recipeItem.recipe.calories) / 10) * 10} calories per serving</RecipeMiniHeader>
          <br></br>
          <ViewFullRecipeLink onClick={() => window.open(recipeItem.recipe.url)}>View Full Recipe</ViewFullRecipeLink>
        </RecipeNutritionContainer>
        <IconButton style={{ backgroundColor: 'transparent' }} disableRipple={true} size={'small'}>
          {(clicked || inFavourites || favourited) ? <FavouriteFilledIcon className={classes.icon}></FavouriteFilledIcon> :
          <FavouriteOutlineIcon className={classes.icon} onClick={() => {addToFavourites({recipeItem})}}></FavouriteOutlineIcon>
          }
        </IconButton>
      </RecipeBody>
    </RecipeContainer>
  );
}

function App() {
  const [timeOutId, setTimeOutId] = useState();
  const [recipeList, setRecipeList] = useState();
  const [loading, setLoading] = useState(false);
  const currentUser = useAuth();

  const getRecipe = async (searchInput) => {
    const response = await axios.get(
      `https://api.edamam.com/search?q=${searchInput}&app_id=${APP_ID}&app_key=${APP_KEY}`
    )
    setRecipeList(response.data.hits);
    // if (currentUser) {
    //   setRecipeList(response.data.hits);
    // } else {
    //   return <div>hi</div>
    // }
  }

  const onTextChange = (event) => {
    clearTimeout(timeOutId);
    const timeOut = setTimeout(() => getRecipe(event.target.value), 500);
    setTimeOutId(timeOut)
  }

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
    <Container style={styles.paperContainer}>
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
      
      <div style={{ margin: 'auto'}}>
        <PromptTitle>Search for an ingredient!</PromptTitle>
        <SearchBar>
          <SearchIcon />
          <SearchInput placeholder="Search ingredient" onChange={onTextChange}/>
        </SearchBar>
      </div>
      <RecipeListContainer>
        {recipeList?.length ? recipeList.map((recipe) => (<RecipeComponent recipeItem={recipe} user={currentUser} />)) : <span style={{ height: '100%'}}></span>}
      </RecipeListContainer>
    </Container>
  );
}

export default App;
