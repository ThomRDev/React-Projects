import { useEffect } from "react"

const AboutPage = () => {
  useEffect(()=>{
    document.title = "About"
    return () => {
      document.title = "App"
    }
  },[])
  return (
    <div>
      <h1>AboutPage</h1>
      <hr />
    </div>
  )
}

export default AboutPage