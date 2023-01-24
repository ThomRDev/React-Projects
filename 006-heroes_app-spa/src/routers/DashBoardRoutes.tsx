import { Route, Routes } from "react-router-dom"
import { DCPage, LoginPage, MarvelPage, SearchPage } from "../components/pages"
import HeroPage from "../components/pages/HeroPage"
import { NavBar } from "../components/sections"

const DashBoardRoutes = () => {
  // console.log("render DashBoardRoutes")
  return (
    <>
    <NavBar />
      <div className="container">
        <Routes>
          <Route path="marvel" element={ <MarvelPage /> } />
          <Route path="dc" element={ <DCPage /> } />
          <Route path="hero/:heroId" element={ <HeroPage /> } />
          <Route path="search" element={ <SearchPage /> } />
          <Route path="/" element={ <MarvelPage /> } />
        </Routes>
      </div>
    </>
  )
}

export default DashBoardRoutes