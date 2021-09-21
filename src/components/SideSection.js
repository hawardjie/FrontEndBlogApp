import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import ReusableCard from './ReusableCard'
import VanGogh from '../assets/VanGogh.jpg'

// SideSection has a fraction view located on the right side page. 
function SideSection(props) {

    // posts state has the top n latest posts
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const queryPage = () => {
            // Request for the latest posts 
            axios.get("content/page/0").then(
                resp => {
                    setPosts(
                        resp.data
                    )
                },
                err => {
                    console.log(err)
                }
            )
            .catch((err) => {
                console.log(err)
            })
        }
        queryPage()
    }, [])

    // convert unix timestamp to human readable format 'Mon dd, yyyy'
    const timestampToDate = (timestamp) => {
        var ts = new Date(timestamp * 1000)
        var year = ts.getFullYear()
        var monthArr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        var month = monthArr[ts.getMonth()]
        var date = ts.getDate()
        var result = month + ' ' + date + ', ' + year 
        return result
    }

    return (
        <Container>
            <Section>
                <ReusableCard style={{marginBottom: '20px'}}> 
                    <Header>
                        <Title>About Us</Title>
                    </Header>
                    <Image>
                        <img src={VanGogh} alt="Van Gogh Profile" />
                    </Image>
                    <Bio> {/* Static content of Van Gogh profile */}
                        <p>Vincent Willem van Gogh was a Dutch post-impressionist painter who posthumously became one of the most famous and influential figures in the history of Western art. In a decade, he created about 2,100 artworks, including around 860 oil paintings, most of which date from the last two years of his life.</p>
                    </Bio>
                </ReusableCard>
            </Section>
            <Section>
                <ReusableCard style={{marginBottom: '20px', padding: '0 15px 0 15px', boxSizing: 'border-box'}}>
                    <Header>
                        <Title>Recent Posts</Title>
                    </Header>
                    <RecentPosts> {/* Show latest posts, reverse the order so top post is the latest one */}
                    {
                            posts.slice(0).reverse().map(postItem => {
                            return (
                                <RecentPost key={postItem.id}>
                                    <NavLink to={`/post/${postItem.id}`}>
                                        <h3>{postItem.title}</h3>
                                    </NavLink>
                                    <span>{timestampToDate(postItem.createdOn)}</span>
                                </RecentPost>
                            )
                        })
                    }
                    </RecentPosts>
                </ReusableCard>
            </Section>
        </Container>
    )   
}

export default SideSection

const Container = styled.div`
    width: 28%;
    min-width: 100px;
`
const Section = styled.section`
    margin-bottom: 5px;
    background-color: #FFF;
    border: 1px solid white; 
`

const Header = styled.div`
    font-size: 18px;
    text-align: center;
    box-sizing: border-box;
    letter-spacking: 2px;
    color: #363535;
`

const Title = styled.div`
    letter-spacing: 0.5px;
    font-size: 24px;
    margin-top: 20px;
    font-weight: 700;
`
const Image = styled.div`
    width: 100%;
    box-sizing: border-box;

    img {
        max-width: 100%;
        max-height: 100%;
        margin-top: 20px;
    }
`
const Bio = styled.div`
    font-size: 14px;
    font-wieght: 300;
    color: #363535;
    padding: 0 15px 0 15px;
`

const RecentPosts = styled.div`
    padding: 15px 0;
    font-weight: 300;
`

const RecentPost = styled.div`
    border-bottom: 1px solid #eee;
    margin-bottom: 10px;

    h3 {
        margin: 0;
        font-size: 14px;
        font-weight: 500;
        color: #363535;
    }

    a {
        text-decoration: none;
    }

    span {
        font-size: 12px;
        float: right;
    }
`

