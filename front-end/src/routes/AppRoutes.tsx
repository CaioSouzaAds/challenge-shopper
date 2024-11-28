import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Options from "../pages/Options/Options";
import History from "../pages/History/History";
import Header from "../components/Header/Header";

const AppRoutes = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/options' element={<Options />} />
        <Route path='/history' element={<History />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
