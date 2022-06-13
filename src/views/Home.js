import styled from 'styled-components'
import { makeStyles } from '@material-ui/styles'
import SearchIcon from '@material-ui/icons/Search'; 
import FavouriteOutlineIcon from '@material-ui/icons/FavoriteBorderOutlined'; 
import FavouriteFilledIcon from '@material-ui/icons/FavoriteOutlined'; 
import axios from 'axios';
import { Header, StyledTitle } from '../components/Navbar';
import { SearchBar, SearchInput } from '../components/SearchBar';
import { Spacing, TickList, RecipeListContainer, RecipeContainer, RecipeBody, RecipeImage, RecipeTitle, RecipeNutritionContainer, RecipeMiniHeader, RecipeDietLabels, RecipeIngredients, RecipeHealthLabels, ViewFullRecipeLink } from '../components/RecipeBox';
import { useState } from 'react';
import { IconButton } from '@material-ui/core';
import { logOut, useAuth, db } from '../firebase.js'
import { StyledButton } from '../components/Fields';
import { Link } from 'react-router-dom';
import { collection, addDoc } from '@firebase/firestore';

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


const RecipeComponent = (props) => {
  const { recipeItem, user } = props;
  const classes = useClasses();

  const addToFavourites = async(recipeObject) => {
    console.log('add');
    await addDoc(collection(db,"users", user.email, "likes"), {recipeObject});
  }

  return (
    <RecipeContainer>
      <RecipeTitle>{recipeItem.recipe.label}</RecipeTitle>
      <RecipeBody>
        <RecipeImage src={recipeItem.recipe.image} />
        <RecipeNutritionContainer>
          <RecipeMiniHeader>Ingredients</RecipeMiniHeader>
          <RecipeIngredients>{recipeItem.recipe.ingredientLines.length ? 
            recipeItem.recipe.ingredientLines.map((ingredient) => <li>{ingredient}</li>) : <br></br>}</RecipeIngredients>
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

          <FavouriteOutlineIcon className={classes.icon} onClick={() => {addToFavourites({recipeItem})}}></FavouriteOutlineIcon>
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
    console.log(response);
    setRecipeList(response.data.hits);
  }

  const onTextChange = (event) => {
    clearTimeout(timeOutId);
    const timeOut = setTimeout(() => getRecipe(event.target.value), 500);
    setTimeOutId(timeOut)

    console.log(recipeList)
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
    <Container>
      <Header>
        CookWhat?
        {currentUser?.email ? 
          <StyledTitle>
            Logged in as: {currentUser.email} {console.log(currentUser)}
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
      <SearchBar>
        <SearchIcon />
        <SearchInput placeholder="Search ingredient" onChange={onTextChange}/>
      </SearchBar>
      <RecipeListContainer>
        {recipeList?.length ? recipeList.map((recipe) => (<RecipeComponent recipeItem={recipe} user={currentUser}/>)) : <span></span>}
      </RecipeListContainer>
    </Container>
  );
}

export default App;