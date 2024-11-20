import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Routes/Home";
import { LoginRoute } from "./Routes/Login";
import { Account } from "./Routes/Account";
import { Place } from "./Routes/Place";


export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element ={<LoginRoute/>}/>
        <Route path="/account" element={<Account/>}/>
        <Route path="/places" element={<Place/>}/>
        </Routes> 
    </Router>
  );
};
