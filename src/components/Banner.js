import React from 'react'
import logo from '../logo.svg'
import Menubar from './Menubar'
import ReusableCard from './ReusableCard'
import styled from 'styled-components'

// function to show company logo and navigation menubar
function Banner(props) {
    return (
        <Container>
            <ReusableCard>
                <header className="App-header">
                    <img src={logo} className="App-logo"  alt="logo" />
                </header>
                {/* Menu bar is below the company logo on UI. It has the options for user to take actions */}
                <Menubar updateState={props.updateState} userFirstname={props.userFirstname} />
            </ReusableCard>
        </Container>
    )
}

export default Banner

const Container = styled.div`
    min-width: 400px;
`