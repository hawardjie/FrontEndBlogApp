import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

// Menubar is below the Header.
// It has the bar navigation with menu choices for user to take actions
function Menubar(props) {

    let dynamicMenu
    if (props.userFirstname) { // if user has logged in
        dynamicMenu = (
            <Container>
                <LeftMenu> {/* Personalized menubar with user first name */}
                    <li><NavLink to="/">{props.userFirstname} Home</NavLink></li>
                </LeftMenu>
                <RightMenu> {/* Show the mennu options to create a new post and to log out */}
                    <li><NavLink to="/newpost">New Post</NavLink></li>
                    <li><NavLink to="/" onClick={() => {
                           localStorage.removeItem("registeredUsername")
                           localStorage.removeItem("userFirstname")
                           localStorage.removeItem("accessToken")
                           props.updateState(undefined)
                        }}>Logout</NavLink>
                    </li>
                </RightMenu> 
            </Container>
        )
    } else { // user has not logged in yet
        dynamicMenu = (
            <Container>
                <LeftMenu>
                    <li><NavLink to="/">Home</NavLink></li>
                </LeftMenu>
                <RightMenu>  {/* Show menu options to login and signup */}
                    <li><NavLink to="/login">Login</NavLink></li>
                    <li><NavLink to="/signup">SignUp</NavLink></li>
                </RightMenu> 
            </Container>
        )
    }

    return (
        <div>{dynamicMenu}</div>
    )
}

export default Menubar

const Container = styled.div`
    display: flex;
    min-width: 400px;
    justify-content: space-between;
    padding: 8px 0;

    li {
        list-style: none;
        display: inline-block;

        a {
            text-decoration: none;
            display: block;
            font-size: 18px;
            font-weight: 700;
            padding: 0 10px;
            color: #58586E
        }
    }
`

const LeftMenu = styled.div`
    float: left;
`

const RightMenu = styled.div`
    float: right;
`
