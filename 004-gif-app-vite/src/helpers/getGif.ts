export interface IGif {
  id:string,
  title:string,
  src:string
}
export const getGifs = async (value:string) =>{
  const url= `https://api.giphy.com/v1/gifs/search?q=${encodeURI(value)}&limit=10&api_key=pwnxLb9W6fs5OTrl7Dcri923H2GUNjHC`
  const response = await fetch(url)
  const { data } = await response.json()
  const gifs:IGif[] =  data.map((dataGif:any)=>{
      return {
      id:dataGif.id,
      title:dataGif.title,
      src:dataGif.images.downsized_medium.url
  } as IGif
})
  return gifs
}
