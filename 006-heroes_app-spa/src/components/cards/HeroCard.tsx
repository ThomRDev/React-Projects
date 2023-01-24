import { Link } from "react-router-dom"
import styles from "../../styles/styles.module.css"

type HeroCardProps = {
  id:string
  superhero :string
  publisher :string
  alter_ego:string
  first_appearance:string
  characters:string
}

const HeroCard = ({ id,superhero,publisher,alter_ego,first_appearance,characters }:HeroCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.card_content}>
        <div className={styles.card__img} >
          <img src={`/heroes/${id}.jpg`} alt="" />
        </div>
        <div className={styles.card__description}>
          <h5 className="card-title">{superhero}</h5>
          <p className="card-text">{alter_ego}</p>
          {alter_ego !== characters && <p className="text-muted">{characters} </p>}
          <Link to={`/hero/${id}`}>Mas...</Link>
        </div>
      </div>
    </div>
  )
}

export default HeroCard