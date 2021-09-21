import axios from 'axios'
import React, { useState } from 'react'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'

// This function is used to facilitate the Login page
function Login(props) {

    const [usernameInput, setUsernameInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")

    const doLogin = (e) => {

        e.preventDefault();
        if (!usernameInput || !passwordInput) return;

        const userInfo = {
            username: usernameInput,
            password: passwordInput
        }

        axios.post("auth/signin", userInfo)
            .then(resp => {
                // Store 3 properties to browser's local storage to identify registered user
                localStorage.setItem("accessToken", resp.data.accessToken)
                localStorage.setItem("registeredUsername", resp.data.username)
                localStorage.setItem("userFirstname", resp.data.firstname)
                props.updateState(resp.data.firstname)
            })
            .catch( err => {
                console.log(err)
            })

        // Cleanup the states
        setUsernameInput("")
        setPasswordInput("")
    }

    // Unregistered user is redirected to home page
    if (props.userFirstname) {
        return <Redirect to={'/'} />
    }

    return (
        <Container>
            <InputContainer>
                <h3>Use your account</h3>
                {/* Provide a username and password input form for user to login */}
                <form>
                    <input 
                        type="text" 
                        placeholder="Username"
                        onChange={(e) => setUsernameInput(e.target.value)}
                        value={usernameInput} />
                    <input 
                        type="password" 
                        placeholder="Password"
                        onChange={(e) => setPasswordInput(e.target.value)}
                        value={passwordInput} />
                    {/* Call the function expression doLogin if button is clicked */}
                    <button type="submit" id="submitBtn"
                        onClick={doLogin}>Log In</button>  
                </form>
            </InputContainer>
        </Container>
    )
}

export default Login

const Container = styled.div`
    width: 100%;
    height: 50vh;
    min-width: 400px;
    background-color: #f8f8f8;
    display: flex;
    justify-content: center;
    align-items: center;
`

const InputContainer = styled.div`
    min-width: 100%;
    height: 40vh;
    // border: 1px solid blue;
    margin: 0vw;
    padding: 0vw;
    position: relative;

    h3 {
        text-align: center;
    }

    input {
        display: block;
        width: 50%;
        padding: .5rem .7rem .5rem .7rem;
        margin: 2vw 0;
        margin-right: auto;
        margin-left: auto;
        border: 0;
        font-size: 16px;

        :focus {
            outline: none !important;
        }
    }

    button {
        display: block;
        position: relative;
        background-color: #e7e7e7;
        color: black;
        font-size: 18px;
        padding: 10px 24px;
        margin-top: 30px;
        margin-right: auto;
        margin-left: auto;
        border-radius: 8px;
        border: 0;
        width: 30%;
        box-shadow: 0 6px 12px 0 rgba(0,0,0,0.2), 0 4px 18px 0 rgba(0,0,0,0.19);

        :hover {
            background-color: #555555;
            color: white;
            box-shadow: 0 10px 12px 0 rgba(0,0,0,0.22), 0 18px 60px 0 rgba(0,0,0,0.19);
        }
    }
`
