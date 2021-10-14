import React from "react";
import Navbar from "./components/Navbar";
// import AllBusinesses from "./components/businesses/allBusinesses/AllBusinesses";
// import LoginPage from "./components/Login";
import Routes from "./components/Routes/Routes";

//how to CRUD with firestore: https://firebase.google.com/docs/firestore/manage-data/add-data#web-version-9

function App() {
  return (
    <div>
      {/* <Navbar /> */}
      <div id="singlepage">
        <Routes />
      </div>
    </div>
  );
}

export default App;
