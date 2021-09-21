import React from 'react'
import styled from 'styled-components'
import BlogSection from '../components/BlogSection'
import SideSection from '../components/SideSection'

// Function to facilitate the Post page that shows post details including 
// its related blog description, image, and related comments created by user(s)
function Post(props) {

    return (
        <Container>
            {/* Contains to main components: <BlogSection> on the right and <SideSection> on the left page */}
            <BlogSection {...props} />    {/* Pass the existing proprerties for the current active post */}
            <SideSection />
        </Container>
    )
}

export default Post

const Container = styled.div`
    display: flex;
    min-width: 400px;
    justify-content: space-between;
    margin: 20px 0;
`
