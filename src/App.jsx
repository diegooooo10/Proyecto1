import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Routes/Home";
import { LoginRoute } from "./Routes/Login";


export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element ={<LoginRoute/>}/>

        </Routes>
    </Router>
  );
};
