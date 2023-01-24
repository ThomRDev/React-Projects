import { heroes } from "../data/hero"

export const getHeroById = (id:string) =>{
  return heroes.find(hero=>hero.id === id)
}