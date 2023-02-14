import { BrowserRouter, Route, Routes } from "react-router-dom"
import LandingPage from "./components/LandingPage"
import Home from "./components/Home"
import { Provider } from "react-redux"
import store from "./redux/store"
import Songs from "./components/Songs"

function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/songs" element={<Songs />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App
