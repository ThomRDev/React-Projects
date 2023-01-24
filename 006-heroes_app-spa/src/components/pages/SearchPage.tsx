import queryString from "query-string"
import { FormEvent, useMemo, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useForm } from "../../hooks/useForm"
import { getHerosByName } from "../../selectors/getHeroesByName"
import HeroCard from "../cards/HeroCard"

const SearchPage = () => {

  const history = useNavigate()
  const location = useLocation()

  // query-string nos ayudara a obtener los parametros mas facil
  const { q = "" } = queryString.parse(location.search)
  const heroesMatches = useMemo(()=>getHerosByName(q as string ?? ""),[q]) 

  const {hero,handleChange,reset} = useForm({
    hero : ""
  })

  const inputRef = useRef<HTMLInputElement>(null)
  const handleSubmitSearchHero = (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if(hero.trim().length) history(`?q=${hero}`)
    else history(``)
    reset()
    inputRef.current?.focus()
  }
  
  return (
    <div className="mt-2">
      <h2 className="mt-3 mb-3">Search</h2>
      <div className="row g-5">
        <div className="col-sm-12 col-md-7">
          <h4>Search Form</h4>
          <hr />
          <form className="form" onSubmit={handleSubmitSearchHero} aria-label="form">
            <input type="text" className="form-control"
            placeholder="Search Hero..."
            autoComplete="off"
            name="hero"
            value={hero}
            ref={inputRef}
            onChange={handleChange}
            />
            <button type="submit" className="btn btn-outline-primary form-control mt-3">Search ...</button>
          </form>
        </div>
        <div className="col-sm-12 col-md-5">
          <h4>Results</h4>
          <hr />
          { q == "" ? <div className="alert alert-info" aria-label="alert">Search a Hero</div> :  
            heroesMatches.length == 0 && <div className="alert alert-danger" aria-label="alert">No Results! with: { JSON.stringify(q) }</div> 
          }
          {heroesMatches.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchPage