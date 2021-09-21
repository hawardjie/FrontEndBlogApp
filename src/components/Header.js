import React from 'react'
import styled from 'styled-components'

// All pages has this Header to show the very top page
// with main title on the left and slogan on the right
function Header(props) {
    return (
        <Container>
            <nav>Vincent van Gogh's Blog</nav>  {/* Main title */}
            <nav>Passion of Art</nav>           {/* Slogan */}
        </Container>
    )
}

export default Header

const Container = styled.div`
    display: flex;
    font-size: 12px;
    letter-spacing: 1.2px;
    justify-content: space-between;
    margin: 10px 0;
`