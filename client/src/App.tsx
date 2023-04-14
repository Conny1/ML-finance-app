 import { BrowserRouter , Route, Routes} from "react-router-dom"
import styled from "styled-components"
import NavBar from "./scenes/NavBar"
import Dashboard from "./scenes/Dashboard"
import Predictions from "./scenes/Predictions"

const Container = styled.div`
width:100%;
height:100%;

`

function App() {
 

  return (
    <div className="app">
      <BrowserRouter>
      <Container>
        <NavBar/>
        <Routes>
          <Route path="/"  element={<Dashboard/>} />
          <Route path="/predictions"  element={<Predictions/>} />
        </Routes>
      </Container>
      </BrowserRouter>
    </div>
  )
}

export default App
