import { useMemo } from "react"
import { Navigate , useNavigate, useParams } from "react-router-dom"
import { getHeroById } from "../../selectors/getHeroById"

const HeroPage = () => {


  const { heroId } = useParams()

  const hero = useMemo(()=>getHeroById(heroId as string),[heroId])
  
  // tambien podriamos usar el hook useNavigate
  // pero tendria que teminar en un return vacio
  // no cual ya no seria en Functional Component
  if(!hero) return <Navigate to="/" />
  
  const history = useNavigate()

  const { id, superhero, first_appearance, characters, alter_ego, publisher } = hero;

  // si no colocamos la configuracion de vite.config.ts
  // llamariamos asi /assets/heroes/${id}.jpg
  const imgPath = `/heroes/${id}.jpg`;
  
  const hanldeReturn = () => {
    // history(-1) que valla al historial anterior, pagina anterior
    history(-1)
  }
  
  return (
    <div className="row mt-5">
      <div className="col-4">
        <img
          src={imgPath}
          alt={id}
          className="img-thumbnail animate__animated animate__fadeInLeft"
        />
      </div>

      <div className="col-8">
        <h3>{superhero} </h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <b>Alter Ego:</b> {alter_ego}
            <br />
            <b>Publisher:</b> {publisher}
            <br />  
            <b>First Appearance:</b> {first_appearance}
          </li>
        </ul>

        <h5 className="mt-3">Characters</h5>
        <p>{characters}</p>

        <button className="btn btn-outline-info"
          onClick={hanldeReturn}
        >
          Go back...
        </button>
      </div>
    </div>
  );
}

export default HeroPage