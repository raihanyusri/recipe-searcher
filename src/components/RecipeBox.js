import styled from 'styled-components'

export const RecipeListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 30px;
  justify-content: space-evenly;
`

export const RecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 700px;
  border-radius: 8px;
  box-shadow: 0 3px 10px 0 #aaa;
`
export const RecipeBody = styled.div`
  display: flex;
  flex-direction: row;
`

export const RecipeImage = styled.img`
  height: 300px;
  object-fit: cover;
  border-radius: 4px;
`

export const RecipeTitle = styled.h2`
  margin: 10px 0;
  text-align: center;
`

export const RecipeNutritionContainer = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
`

export const RecipeMiniHeader = styled.span`
  font-size: 16px;
  font-weight: bold;
`

export const RecipeDietLabels = styled.ul`
  font-size: 14px;
  list-style: none;
`

export const ViewFullRecipeLink = styled.span`
  font-size: 14px;
  color: blue;
  cursor: pointer;
`

export const TickList = styled.li`
  &:before {
    content: '✅ ';
  }
  text-indent: -35px;
`

export const RecipeHealthLabels = styled.div`
  font-size: 11px;
`

export const Spacing = styled.span`
  position: relative;
  left: 5px;
`

export const RecipeIngredients = styled.div`
  font-size: 13px;
  font-style: italic;
`