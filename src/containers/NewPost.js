import axios from 'axios'
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'

// Enable registered user to create a new post
function NewPost(props) {

    const [titleInput, setTitleInput] = useState("")
    const [contentInput, setContentInput] = useState("")
    const [state, setState] = useState({
        imageFiles: []
    })

    // Function expression for useDropzone to set the state
    const onDrop = (acceptedFiles) => {
        setState({
            imageFiles: acceptedFiles
        })
    }

    const {getRootProps, getInputProps, isDragActive, isDragReject} = useDropzone({onDrop})

    // Redirect to Login page if user is not yet identified
    if (!props.userFirstname) {
        return <Redirect to={"/login"} />
    } 

    // This function expression is called when user clicks the submit button
    const createNewPost = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('title', titleInput)
        formData.append('content', contentInput)
        formData.append('imageFile', state.imageFiles[0])

        // Construct config header for axios
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        // Submit user's new post details to server
        axios.post('content/new/post', formData, config).then(
            res => {
                console.log(res)
            }
        ).catch(
            err => {
                console.log(err)
            }
        )

        // Cleanup the states
        setTitleInput("")
        setContentInput("")
        setState({
            imageFiles: []
        })

        // Redirect to Homepage
        props.history.push("/")
    }

    return (
        <Container>
            <InputContainer>
                <h3>Create New Post</h3>
                <form>
                    {/* Allow user to drag an image file to the drop zone OR click to select an image file to upload */}
                    <DropImage {...getRootProps()}>
                        <input {...getInputProps()} />
                        {isDragActive ? 'Yes, drop it here' : 'Drag & drop OR click to upload image'}
                        {isDragReject && 'File type not allowed. Use png/jpg/jpeg file'}
                    </DropImage>
                    {/* Show image preview before sending the new post to server to save content */}
                    {state.imageFiles.length > 0 ? <img src={URL.createObjectURL(state.imageFiles[0])} 
                        alt='Preview' style={{ display: 'block', margin: 'auto', width: '50%', height: '50%', border: "3px solid #CCC" }} /> : ''}
                    <input
                        type="text"
                        placeholder="Title"
                        onChange={(e) => setTitleInput(e.target.value)}
                        value={titleInput} />
                    <textarea
                        type="text"
                        rows="8"
                        placeholder="Enter your content"
                        onChange={(e) => setContentInput(e.target.value)}
                        value={contentInput} />
                    {/* Call the function expression createNewPost if button is clicked */}
                    <button type="submit" id="submitBtn"
                        onClick={createNewPost}>Submit</button>
                </form>
            </InputContainer>
        </Container>
    )
}

export default NewPost

const Container = styled.div`
    width: 100%;
    height: 100%;
    min-width: 400px;
    background-color: #f8f8f8;
    display: flex;
    justify-content: center;
    align-items: center;
`

const InputContainer = styled.div`
    min-width: 100%;
    margin: 0vw;
    padding: 5vw;
    position: relative;

    h3 {
        text-align: center;
    }

    input, textarea {
        display: block;
        font-family:inherit;
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

    textarea {
        resize: none;
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
        width: auto;
        box-shadow: 0 6px 12px 0 rgba(0,0,0,0.2), 0 4px 18px 0 rgba(0,0,0,0.19);

        :hover {
            background-color: #555555;
            color: white;
            box-shadow: 0 10px 12px 0 rgba(0,0,0,0.22), 0 18px 60px 0 rgba(0,0,0,0.19);
        }
    }
`

const DropImage = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    //border: 1px solid red;
    align-items: center;
`
