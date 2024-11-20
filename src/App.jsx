import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Routes/Home";
import { LoginRoute } from "./Routes/Login";
import { Account } from "./Routes/Account";
import { Place } from "./Routes/Place";
import { Error404 } from "./components/Error404";


export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element ={<LoginRoute/>}/>
        <Route path="/account" element={<Account/>}/>
        <Route path="/places" element={<Place/>}/>
        <Route path="*" element={<Error404/>} />
        </Routes> 
    </Router>
  );
};
