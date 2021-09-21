import axios from 'axios'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ReusableCard from '../components/ReusableCard'

// Home is the main page of the blog app. Users do not need to login to see this Home page
// This blog app has a set of posts. Each post can have comments created by various user(s).
// A registered User can create a new post. Users can view Home page without login.
// The Home page has a Dashboard. It consists of selected images from the latest posts.
// Comments in the posts can be viewed publicly. Like a post, comment can only be created
// by a registered user. Unlike a post, a comment can be deleted by its owner only. 
function Home(props) {
    const [posts, setPosts] = useState([]) // Latest posts
    // We have the latest posts, but the app only selects some of the latest posts to show their images on Home page
    const [selectedImages, setSelectedImages] = useState([])  // Images related to some the latest posts
    const [selectedPostIds, setSelectedPostIds] = useState([]) // Ids related to some the latest posts

    // Get the latest posts from the server
    const QueryPage = async () => {
      await axios.get("content/page/0").then(
        resp => {
          setPosts(resp.data)
        },
        err => {
          console.log(err)
        }
      )
      .catch((err) => {
        console.log(err)
      })
    }
 
    // This function expression is utilized to show Dashboard images. It gets an image 
    // selected from the available latest posts queried earlier through furnction QueryPage.
    // The reason we get the image randomly is to make the Home page to have different images
    // on main dashboard each time the page is refreshed or whenever user clicks the Home page link
    // on the menu, dashboard shows different images related to the posts created by user(s)
    const RenderSideImage = async () => {
      if (posts.length === 0)
        return;
      // Get a random index 
      let index = Math.floor(Math.random()*posts.length)
      let post = posts[index] // Use the index to get the selected post
      posts.splice(index, 1);
      // Get the image related to the selected post
      axios.get("content/image/" + post.imageId, {
        responseType: 'arraybuffer',
        headers:  {
          'Content-Type': 'application/json'
        }
      }).then(
        resp => {
          const type = resp.headers['content-type']
          const blob = new Blob([resp.data], { type: type, encoding: 'UTF-8' })
          let imageBlob = URL.createObjectURL(blob)
          setSelectedImages((prevImages) => prevImages.concat(imageBlob))
          setSelectedPostIds((prevPostIds) => prevPostIds.concat(post.id))
        }
      )
      
    }
  
    useEffect(() => {
      QueryPage()   // Call this function only once
    }, [])
  
    useEffect(() => {
      for (var i=0; i < 4; i++) {
        RenderSideImage()   // Call this function if posts are updated
      }
    }, [posts]) // eslint-disable-line react-hooks/exhaustive-deps

    // Gallery is the function expression to provide images on Dashboard. A Dashboard consists of 4 images.
    // One of the images is the main image related to a post. This image is the largest one amongst the others.
    // The other three images are the side images (thumnbnail images) located on the right side of the main image.
    // Any of these four images can be clicked to view the individual post details for the blog.
    const Gallery = (props) => {
        return (
            <DashboardImages style={props.imageStyle}>
                <section style={{ width: props.mainWidth }}>
                    <DashboardContent>
                        {/* Display main image and allow user to click the image to show post details */}
                        <a href={`post/`+selectedPostIds[0]}>
                            <img src={selectedImages[0]} key='0' alt=""/>
                        </a>
                    </DashboardContent>
                </section>
                <section style={{ width: props.mainWidth }}>
                    <DashboardContent>
                        {/* Display side (thumbnail) images vertically located on the right side of main iamge */}
                        {[...Array(3)].map((x,i) => {
                            return (
                              <div style={{ height: `${props.sideImageHeight}px`}} key={i+1}>
                                  <a href={`post/`+selectedPostIds[i+1]}>
                                      <img src={selectedImages[i+1]} alt=""/>
                                  </a>
                              </div>)
                        })}
                    </DashboardContent>
                </section>
            </DashboardImages>
        )
    }

    const mainImageHeight = 450
    const sideImageHieght = mainImageHeight / 3
    const imageStyle = {
        height: mainImageHeight+'px',
        overflow: 'hidden'
    }

    return (
       <Container>
           <Dashboard>
           <ReusableCard>
               {/* mainWidth for main image; sideWidth for side images */}
               <Gallery
                    mainWidth="80%"
                    sideWidth="20%"
                    sideImageHeight={sideImageHieght}
                    imageStyle={imageStyle}
                />
           </ReusableCard>
           </Dashboard>
       </Container> 
    )
}

export default Home

const Container = styled.div`
    width: 100%;
    height: 100%;
    min-width: 400px;
    background-color: #f8f8f8;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Dashboard = styled.div`
    min-width: 100%;
    height: 100%;
    margin-bottom: 30px;
    //border: 1px solid blue;
    padding-top: 0;
    position: relative;
`

const DashboardImages = styled.div`
    display: flex;
    justify-content: space-between;
`

const DashboardContent = styled.div`
    width: 100%;
    height: 100%

    img {
        max-height: 100%;
        object0fit: cover;
    }
`