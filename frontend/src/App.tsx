import { Route, Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import HomePage from "./pages/HomePage"


function App() {

  return (
    <>
      
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage /> } />
        </Routes>
        
      
     
    </>
  )
}

export default App
