import React from 'react'
import styled from 'styled-components'

// Reusable Card function that is being used as a template across the app
function ReusableCard(props) {
    return (
        // Use the caller properties if available
        <Card style={{ width: props.width ? props.width: '100%' }} {...props}>
            {props.children}
        </Card>
    )   
}

export default ReusableCard

const Card = styled.div`
    width: 100%;
    background: #fff;
`