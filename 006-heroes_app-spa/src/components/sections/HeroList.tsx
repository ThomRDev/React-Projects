import { useMemo } from "react"
import { getHeroByPublisher } from "../../selectors/getHeroByPublisher"
import HeroCard from "../cards/HeroCard"

import style from "./../../styles/styles.module.css"

type HeroTypeProps = {
  publisher : string
}

const HeroList = ({ publisher }:HeroTypeProps) => {

  const heroes = useMemo(()=>getHeroByPublisher(publisher),[publisher]) 

  return (
    <div className={style.cards+" animate__animated animate__fadeIn"} >
      {
        heroes.map(hero=>{
          return <HeroCard key={hero.id} {...hero} />
        })
      }
    </div>
  )
}

export default HeroList