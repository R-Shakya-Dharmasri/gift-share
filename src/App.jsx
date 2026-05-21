import "./App.css"

import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";

import { useState } from "react";

function Home(){
  const [partnerName, setPartnerName] = useState("");
  const navigate = useNavigate();

  const handClick = (e) => {
    e.preventDefault();

    navigate("/gift",{
      state: {
        name: partnerName,
      },
    });
  };

  return(

        <form className="home" onSubmit={handClick}>

          <h1>Enter your Secret message</h1>

        <input type="text" placeholder="message"
          required value={partnerName} 
          onChange={(e) => setPartnerName(e.target.value)}/>
        
        <br/>

        <button type="submit">
          Create Gift
          </button>


        </form>
   

  )
}

function GiftPage(){
  

    const location = useLocation();

    const navigate = useNavigate();

    const partnerName = location.state?.name || "My Love";

    const generateLink = () => {

    const encodedMessage = encodeURIComponent(partnerName);

    navigate(`/share?msg=${encodedMessage}`);
  };

   return (
    <div className="gift-container">
      <div className="gift-box">
        <div className="lid"></div>
        <div className="box"></div>
        <div className="ribbon-vertical"></div>
        <div className="ribbon-horizontal"></div>
        <h1 className="love-msg">
          {partnerName}
        </h1>
      </div>

        <button className="share-btn" onClick={generateLink}>
        Generate Share Link
      </button>

    </div>

    

  );
}

function SharePage() {

  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const message = params.get("msg");

  return (

    <div className="gift-container">

      <div className="gift-box">

        <div className="lid"></div>

        <div className="box"></div>

        <div className="ribbon-vertical"></div>

        <div className="ribbon-horizontal"></div>

        <h1 className="love-msg">
          {message}
        </h1>

      </div>

    </div>
  );
}

function App(){
  return(
    <Router>
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/gift" element = {<GiftPage/>}/>
        <Route path="/share" element={<SharePage/>}/>
      </Routes>
    </Router>
  )
}

export default App