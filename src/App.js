import './App.css'
import { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Banner from './components/Banner'
import Header from './components/Header'
import Login from './containers/Login'
import Signup from './containers/Signup'
import Home from './containers/Home'
import Post from './containers/Post'
import NewPost from './containers/NewPost'

function App() {

  // Get userFirstname from browser's localStorage for the state
  const [state, setState] = useState({
    userFirstname: localStorage.getItem('userFirstname')
  })

  const updateState = (firstname) => {
    setState({
      userFirstname: firstname
    })
  }

  return (
    <Router>
      <div className="App">
        <Header />
        {/* Update userFirstname */}
        <Banner updateState={updateState} userFirstname={state.userFirstname} />

        {/* Pass the props (i.e. updateState and userFirstname) to components (except for component <Signup>) */}
        <Switch>
          {/* Homepage */}
          <Route exact path="/" component=
              {
                () => <Home
                          updateState={updateState}
                          userFirstname={state.userFirstname}
                      />
              }
          />

          {/* View a specific post details */}
          <Route path="/post/:postId" component=
              {
               (props) => <Post
                          updateState={updateState} 
                          userFirstname={state.userFirstname}
                          {...props}
                     />
              }
          />

          {/* Route to Login page */}
          <Route path="/login" component=
              {
                () => <Login 
                          updateState={updateState} 
                          userFirstname={state.userFirstname}
                       />
              } 
          />

          {/* Create a new user account */}
          <Route path="/signup" component={Signup} />

          {/* Create a new post */}
          <Route path="/newpost" component=
              {
                (props) => <NewPost
                            updateState={updateState} 
                            userFirstname={state.userFirstname}
                            {...props}
                          />              
              }
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
