
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SingIn from "./pages/SingIn";
import SingUp from "./pages/SingUp";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";

const App =()=> {
  return (
    <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/sing-in" element={<SingIn/>} />
          <Route path="/sing-up" element={<SingUp/>} />

          <Route element={<PrivateRoute/>}>
            <Route path="/dashboard" element={<Dashboard/>} />
          </Route>
          
          <Route path="/projects" element={<Projects/>} />
        </Routes>
        <Footer />
    </BrowserRouter>
  )
}

export default App;