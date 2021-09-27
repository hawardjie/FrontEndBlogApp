import axios from 'axios'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ReusableCard from './ReusableCard'
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

// BlogSection occupies majority of the area on the blog page
function BlogSection(props) {

    // initial state for a specific blog post (a.k.a. 'blog')
    const [postItem, setPostItem] = useState({
        id: "",
        title: "",
        content: "",
        username: "",
        createdOn: "",
        imageId: ""
    })

    // a blog can only have one image
    const [postImage, setPostImage] = useState("")

    // all comments related to the blog
    const [comments, setComments] = useState([])

    // state to keep track a new comment entered by user
    const [commentInput, setCommentInput] = useState("")

    useEffect(() => {
        // unique identifier of a blog
        const localPostId = props.match.params.postId

        // get a specific blog by its unique id
        axios.get("content/post/" + localPostId)
            .then(resp => {
                setPostItem(resp.data) // set the blog state
            })
            .catch(err => {
                console.log(err)
            })
    }, [props.match.params.postId])  // monitor the postId change 

    useEffect(() => {
        if (postItem.imageId) {    // Safeguard: go to next only if blog has an image
            axios.get("content/image/" + postItem.imageId, { responseType: "arraybuffer" })
                .then((resp) => {
                    // set the image state (in binary base64 format) of the blog
                    setPostImage(Buffer.from(resp.data, "binary").toString("base64"))
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [postItem])  // minotor any changes of this blog

    const commentInfo = {
        content: commentInput,  // placeholder for user's new comment
        postId: postItem.id     // unique id of blog related to the comment
    }

    const createNewComment = (e) => {
        e.preventDefault() // prevent the default behavior to add comment, 
                           // refresh UI, and scroll to the top page. 
                           // We want to add comment, refresh UI, and  
                           // stay at the current position on browser 

        // safeguard: do not persist an empty content
        if (commentInfo.content.length === 0)
            return

        // REST request to persist new comment 
        // This requires Authorization Bearer header defined in
        // index.js file
        axios.post('content/new/comment', commentInfo).then(
            res => {
                // console.log(res)   // for debugging only (if needed)
            }
        ).catch(
            err => {
                console.log(err)
            }
        )
        setCommentInput("") // clear content state
    }

    const deleteComment = (commentItem) => {
        // invokes REST call to server to delete a specific comment
        axios.delete('content/comment/' + commentItem.id).then(
            res => {
                // console.log(res)  // for debugging purpose
                setComments(
                    comments.filter(commentElement => commentElement !== commentItem)
                ) // set Comments state, exclude the deleted comment
            }
        ).catch(
            err => {
                console.log(err)
            }
        )
    }

    useEffect(() => {
        if (postItem.id) {
            let isMounted = true    // flag to prevent memory leaks 
            axios.get("content/comments/post/" + postItem.id)
                .then((resp) => {
                    // only setComments when isMounted is true
                    if (isMounted) setComments(resp.data)
                })
                .catch(err => {
                    console.log(err)
                })
            return () => { isMounted = false }
        }
    }, [postItem.id, comments])  // monitor blog id and comments changes

    // convert unix timestamp to human readable format 'Mon dd, yyyy'
    const timestampToDate = (timestamp) => {
        var ts = new Date(timestamp * 1000)
        var year = ts.getFullYear()
        var monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        var month = monthArr[ts.getMonth()]
        var date = ts.getDate()
        var result = month + ' ' + date + ', ' + year
        return result
    }

    // cleanup function (similar to componentWillUnmount)
    useEffect(() => {
        return () => {
            // cancel existing axios REST calls to server (if any)
            let source = axios.CancelToken.source()
            source.cancel("Cancelling axios request druing cleanup")
        }
    })

    return (
        <Container>
            <Section>
                <ReusableCard>
                    <Header>
                        <Title>{postItem.title}</Title>   {/* Blog title */}
                    </Header>
                    <Image>
                        {/* A blog post can only have one image */}
                        <img src={`data:image/*;charset=utf-8;base64,${postImage}`} alt="Posted_image" />
                    </Image>
                    <Content>
                        <p>{postItem.content}</p>     {/* Blog content */}
                        <p><span>Posted by {postItem.username} on {timestampToDate(postItem.createdOn)}</span></p>
                    </Content>
                </ReusableCard>
            </Section>
            {
                /* show all comments from various users related to the blog */
                comments.map(commentItem => {
                    return (
                        <Section key={commentItem.id}> {/* include a unique key for each child */}
                            <ReusableCard>
                                <Comment>
                                    <p>{commentItem.content}</p>   {/* comment content */}
                                    <CommentFooter>
                                        Commented by {commentItem.username} on {timestampToDate(commentItem.createdOn)}
                                        {
                                            (localStorage.getItem('registeredUsername') !== commentItem.username)
                                            ? null   /* Do not show the delete icon if comment was not created by current user */
                                            :
                                              [
                                                /* Allow user to delete his/her own existing comment */
                                                <DeleteComment key={commentItem.id}>
                                                    {/*  Call function deleteComment if user clicks the delete icon */}
                                                    <DeleteForeverOutlinedIcon onClick={() => { deleteComment(commentItem) }} />
                                                </DeleteComment>
                                              ]
                                        }
                                    </CommentFooter>
                                </Comment>
                            </ReusableCard>
                        </Section>
                    )
                })
            }
            {
                (!props.userFirstname) 
                ? null    /*  If user not login, do not show textarea to enter and submit new comment  */
                : [       
                    <InputContainer key={postItem.id}>   {/* Pass blog id to identify the InputContainer component */}
                        <form>
                            <textarea
                                type="text"
                                rows="8"
                                placeholder="Enter your comment"
                                onChange={(e) => setCommentInput(e.target.value)}  /* set CommentInput state */
                                value={commentInput} />
                            <button type="submit" id="submitBtn" onClick={createNewComment}>Submit</button>
                        </form>
                    </InputContainer>
                ]
            }
        </Container>
    )
}

export default BlogSection

const Container = styled.div`
    width: 70%;
`
const Section = styled.section`
    margin-bottom: 5px;
    background-color: #FFF;
    border: 1px solid white; 
`

const Header = styled.div`
    text-align: center;
`

const Title = styled.div`
    letter-spacing: 0.5px;
    font-size: 24px;
    margin-top: 20px;
    font-weight: 700;
`

const Image = styled.div`
    width: 100%;
    padding: 0;
    box-sizing: border-box;
    background-size: contain;

    img {
        width: 100%;
        height: auto;
        margin-top: 20px;
        object-fit: contain;
    }
`

const Content = styled.div`
    padding: 0 15px 30px 15px;
    font-weight: 300;
    color: #363535;

    span {
        font-size: 14px;
        font-style: italic;
        padding: 10px 0;
        float: right; 
    }
`

const Comment = styled.div`
    margin-top: 0px;
    padding: 0 15px 10px 15px;
`

const CommentFooter = styled.div`
    display: flex;
    font-size: 14px;
    font-style: italic;
    align-items: center;
    justify-content: space-between;
`

const DeleteComment = styled.div`
    cursor: pointer;
`

const InputContainer = styled.div`
    margin-top: 0px;
    padding: 0 22px 0 0;
    background-color: #FFF;
    border: 1px solid white;

    textarea {
        resize: none;
        font-family:inherit;
        width: 100%;
        padding: .5rem .7rem .5rem .7rem;
        margin: 0;
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
        padding: 10px 35px;
        margin-top: 10px;
        margin-bottom: 15px;
        margin-left: auto;
        border-radius: 8px;
        border: 0;
        width: auto;
        box-shadow: 0 6px 12px 0 rgba(0,0,0,0.2), 0 4px 18px 0 rgba(0,0,0,0.19);

        :hover {
            background-color: #555555;
            color: white;
            box-shadow: 0 10px 12px 0 rgba(0,0,0,0.22), 0 18px 60px 0 rgba(0,0,0,0.19);
        }
    }
`
