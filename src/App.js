import React from "react";
// import AllBusinesses from "./components/businesses/allBusinesses/AllBusinesses";
// import LoginPage from "./components/Login";
import Routes from "./components/Routes/AllRoutes";
import Header from "./components/Header";

function App() {
  return (
    <div className='singlepage'>
      <Header />
      <div id='singlepage'>
        <Routes />
      </div>
    </div>
  );
}

export default App;
