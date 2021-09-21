import axios from 'axios'
import React, { useState } from 'react'
import styled from 'styled-components'

// This function facilitates the registration page to create a new user account
function Signup(props) {

    const [firstnameInput, setFirstnameInput] = useState("")
    const [lastnameInput, setLastnameInput] = useState("")
    const [usernameInput, setUsernameInput] = useState("")
    const [emailInput, setEmailInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")

    // Create a new account function expression
    const createNewUser = (e) => {
        e.preventDefault()
        // Placeholder object to store user info inputs
        const userInfo = {
            firstname: firstnameInput,
            lastname: lastnameInput,
            username: usernameInput,
            email: emailInput,
            password: passwordInput
        }

        // Submit new user info to server
        axios.post("auth/signup", userInfo).then(
            resp => {
                console.log(resp)
            }
        ).catch(
            err => {
                console.log(err)
            }
        )

        // Cleanup the states
        setFirstnameInput("")
        setLastnameInput("")
        setUsernameInput("")
        setEmailInput("")
        setPasswordInput("")

        // Redirect to Login page after signup
        props.history.push("/login")
    }


    return (
        <Container>
            <InputContainer>
                <h3>Create New Account</h3>
                {/* Provide a signup form for user to create a new account */}
                <form>
                    <input 
                        type="text" 
                        placeholder="First Name"
                        onChange={(e) => setFirstnameInput(e.target.value)}
                        value={firstnameInput} />
                    <input 
                        type="text" 
                        placeholder="Last Name"
                        onChange={(e) => setLastnameInput(e.target.value)}
                        value={lastnameInput} />
                    <input 
                        type="text" 
                        placeholder="Username"
                        onChange={(e) => setUsernameInput(e.target.value)}
                        value={usernameInput} />
                    <input 
                        type="text" 
                        placeholder="Email"
                        onChange={(e) => setEmailInput(e.target.value)}
                        value={emailInput} />
                    <input 
                        type="password" 
                        placeholder="Password"
                        onChange={(e) => setPasswordInput(e.target.value)}
                        value={passwordInput} />
                    {/* Call the function expression createNewUser if button is clicked */}
                    <button type="submit" id="submitBtn"
                        onClick={createNewUser}>Sign Up</button>
                </form>
            </InputContainer>
        </Container>
    )
}

export default Signup

const Container = styled.div`
    width: 100%;
    min-width: 400px;
    height: 70vh;
    background-color: #f8f8f8;
    display: flex;
    justify-content: center;
    align-items: center;
`

const InputContainer = styled.div`
    min-width: 100%;
    height: 60vh;
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