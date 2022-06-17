import styled from 'styled-components'

export const PromptTitle = styled.h2`
    font-family: -apple-system, system-ui, system-ui, "Segoe UI", Roboto, "Helvetica Neue", "Fira Sans", Ubuntu, Oxygen, "Oxygen Sans", Cantarell, "Droid Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Lucida Grande", Helvetica, Arial, sans-serif;
    margin: 10px 0;
    text-align: center;
`

export const Prompt = styled.div`
    font-family: -apple-system, system-ui, system-ui, "Segoe UI", Roboto, "Helvetica Neue", "Fira Sans", Ubuntu, Oxygen, "Oxygen Sans", Cantarell, "Droid Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Lucida Grande", Helvetica, Arial, sans-serif;
    font-size: 13px;
    text-align: center;
`

export const StyledInput = styled.input.attrs({ type: 'text' })`
    font-family: -apple-system, system-ui, system-ui, "Segoe UI", Roboto, "Helvetica Neue", "Fira Sans", Ubuntu, Oxygen, "Oxygen Sans", Cantarell, "Droid Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Lucida Grande", Helvetica, Arial, sans-serif;
    padding: 5px;
    margin: 5px;
    flex: 1 0;
    min-width: 224px;
    min-height: 22px;
    font-size: 15px;
    width: 30%;
    background-color: transparent;
    padding-left: 10px;
    border: 1px solid grey;
    border-radius: 5px;
    &:focus {
        outline-color: #606afc;
    }
`;

export const StyledPassword = styled.input.attrs({ type: 'password' })`
    padding: 5px;
    margin: 5px;
    flex: 1 0;
    min-width: 224px;
    min-height: 22px;
    font-size: 15px;
    width: 30%;
    background-color: transparent;
    padding-left: 10px;
    border: 1px solid grey;
    border-radius: 5px;
    &:focus {
        outline-color: #606afc;
    }
`;

export const InputContainer = styled.div`
    padding: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const StyledButton = styled.button`
    float: right;
    margin: 5px;
    align-items: center;
    background-color: #0ac23e;
    border: 0;
    border-radius: 80px;
    box-sizing: border-box;
    color: #ffffff;
    cursor: pointer;
    display: inline-flex;
    font-family: -apple-system, system-ui, system-ui, "Segoe UI", Roboto, "Helvetica Neue", "Fira Sans", Ubuntu, Oxygen, "Oxygen Sans", Cantarell, "Droid Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Lucida Grande", Helvetica, Arial, sans-serif;
    font-size: 15px;
    font-weight: 600;
    justify-content: center;
    line-height: 20px;
    max-width: 100px;
    min-height: 40px;
    min-width: 0px;
    overflow: hidden;
    padding: 0px;
    padding-left: 20px;
    padding-right: 20px;
    text-align: center;
    touch-action: manipulation;
    transition: background-color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s, box-shadow 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s, color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s;
    user-select: none;
    -webkit-user-select: none;
    vertical-align: middle;

  &:hover {
    background-color: #07942f;
    color: #ffffff;
  }

  &:focus {
    background-color: #07942f;
    color: #ffffff;
  }

  &:active {
    background: #02300f;
    color: rgb(255, 255, 255, .7);
  }

  &:disabled {
    cursor: not-allowed;
    background: rgba(0, 0, 0, .08);
    color: rgba(0, 0, 0, .3);
  }
`

export const AccessDenied = styled.div`
  font-family: -apple-system, system-ui, system-ui, "Segoe UI", Roboto, "Helvetica Neue", "Fira Sans", Ubuntu, Oxygen, "Oxygen Sans", Cantarell, "Droid Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Lucida Grande", Helvetica, Arial, sans-serif;
  color: red;
  font-size: 15px;
  margin: 10px 0;
  text-align: center;
`
