import styled from 'styled-components'

export const Header = styled.div`
  font-family: -apple-system, system-ui, system-ui, "Segoe UI", Roboto, "Helvetica Neue", "Fira Sans", Ubuntu, Oxygen, "Oxygen Sans", Cantarell, "Droid Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Lucida Grande", Helvetica, Arial, sans-serif;
  color: white;
  background-color: #f0f0e1;
  font-size: 30px;
  font-weight: bold;
  display: inline-block;
  width: 100%;
  height: 105px;
  margin: 0;
  position: sticky;
  top: 0;
  opacity: 0.98;
`

export const StyledTitle = styled.div`
  font-family: -apple-system, system-ui, system-ui, "Segoe UI", Roboto, "Helvetica Neue", "Fira Sans", Ubuntu, Oxygen, "Oxygen Sans", Cantarell, "Droid Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Lucida Grande", Helvetica, Arial, sans-serif;
  color: black;
  font-size: 15px;
  text-align: right;
  margin-right: 20px;
  line-height: 2.75;

  &:hover {
    color: #664500;
  }
`

export const StyledWelcome = styled.div`
  font-family: -apple-system, system-ui, system-ui, "Segoe UI", Roboto, "Helvetica Neue", "Fira Sans", Ubuntu, Oxygen, "Oxygen Sans", Cantarell, "Droid Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Lucida Grande", Helvetica, Arial, sans-serif;
  color: black;
  font-size: 18px;
  text-align: right;
  padding-right: 30px;
  line-height: 2;
  color: #ab5b00;
`

export const MenuContainer = styled.div`
`

export const FavouritesHeader = styled.div`
  font-size: 10px;
`

export const LogoContainer = styled.div`
  float: left;
`

export const MenuBarContainer = styled.div`
  float: right;
  display: flex;s
`
