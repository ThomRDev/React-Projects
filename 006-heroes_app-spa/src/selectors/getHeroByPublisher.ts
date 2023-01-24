import { heroes } from "../data/hero"

export const getHeroByPublisher = (publisher:string) =>{

  const validPublishers = ["DC Comics","Marvel Comics"]
  if(validPublishers.includes(publisher))
    return heroes.filter(hero=>hero.publisher === publisher)
  throw new Error(`${publisher} is not a valid publisher`)
}