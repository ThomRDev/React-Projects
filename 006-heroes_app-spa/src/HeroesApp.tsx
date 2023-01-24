import AuthContextProvider from "./providers/AuthContextProvider"
import AppRouter from "./routers/AppRouter"

// const arr = [
// "dc-black.jpg",
// "dc-arrow.jpg",
// "marvel-spider.jpg"
// ]

function HeroesApp() {
  return (
    <div className="App">
      <AuthContextProvider>
        <AppRouter />
      </AuthContextProvider>
      {/* {
        arr.map(hero=><img src={`/heroes/${hero}`} alt="" />)
      } */}
      
    </div>
  )
}

export default HeroesApp
