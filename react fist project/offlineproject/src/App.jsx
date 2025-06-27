import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [posts, setPosts] = useState([{
    image: "https://yt3.googleusercontent.com/C25u3DcSguL-wd3GaO110Q1fyO5ClTraTjtF72kJhZtpQwuAv3zLmb7K-ZLJecQQJBVvP1McmA=s900-c-k-c0x00ffffff--rj",
    name: "Harkirat",
    subtitle: "followers",
    time: "5min ago",
    postImag: "https://i.ytimg.com/vi/PH_aCiBpRU8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBYBC9eBGS-xOU6SSdLBuOsSg-vEg",
    posttext: "there is a good new! 90% super 30 students successfully get places between 9LPA to 80LPA"
  }])

  const componentsList = posts.map(postData => <PostComponent
    image={postData.image}
    name={postData.name}
    subtitle={postData.subtitle}
    time={postData.time}
    postImg={postData.postImag}

    posttext={postData.posttext}
  />)

  function addPost() {
    
    setPosts([...posts,
    {
      image: "https://yt3.googleusercontent.com/C25u3DcSguL-wd3GaO110Q1fyO5ClTraTjtF72kJhZtpQwuAv3zLmb7K-ZLJecQQJBVvP1McmA=s900-c-k-c0x00ffffff--rj",
      name: "Harkirat",
      subtitle: "followers",
      time: "5min ago",
      postImag: "https://i.ytimg.com/vi/PH_aCiBpRU8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBYBC9eBGS-xOU6SSdLBuOsSg-vEg",
      posttext: "there is a good new! 90% super 30 students successfully get places between 9LPA to 80LPA"
    }
    ])
  }
  return (
    <main style={{ width: "100%", minHeight: "100vh", backgroundColor: "#010c1a", padding: "5%" }}>
      <button onClick={addPost}>add post</button>
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "10px" }}>

        {componentsList}

      </div>
      

    </main>


  )
}


function PostComponent({ image, name, subtitle, time, postImg, posttext }) {

  return (

    <div style={{ width: "30%", height: "fit-content", backgroundColor: "#f4f5f7", borderRadius: "10px", padding: "20px" }}>
      <div class="top" style={{ padding: "5px", display: "flex", justifyContent: "start", alignItems: "center", gap: "10px", fontSize: "16px" }}>
        <div class="img-div" style={{ width: "70px", height: "70px", borderRadius: "200" }}>
          <img style={{ width: "100%", height: "100%", borderRadius: "50%" }} src={image} alt="" />
        </div>

        <div>
          <h4>{name}</h4>
          <span>{subtitle}</span>
          {
            time && <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
              <div>{time} ago</div>
              <svg style={{ width: "10px", height: "10px" }} fill="#000000" width="64px" height="64px" viewBox="0 0 24 24" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,2A10,10,0,1,0,22,12,10.01146,10.01146,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.00917,8.00917,0,0,1,12,20Zm1-8.251V7a1,1,0,0,0-2,0v5a1.00586,1.00586,0,0,0,.11816.47217l1.5,2.79883a1.00029,1.00029,0,0,0,1.76368-.94434Z"></path></g></svg>
            </div>
          }
        </div>
      </div>
      <br />
      <div class="textContent">
        <p>{posttext}</p>
      </div>
      {
        postImg && <div className="mediaContent" style={{ width: "100%", borderRadius: "10px", marginTop: "10px" }} >
          <div style={{ width: "100%", height: "100%" }}>
            <img style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "50% 50%", borderRadius: "8px" }} src={postImg} alt="" />
          </div>
        </div>
      }
    </div>



  )
}
export default App
