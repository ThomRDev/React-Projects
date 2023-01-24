export const getGif = async (value:string) =>{
    try{
        const url= `${process.env.REACT_APP_GIPHY_URL}/search?q=${encodeURI(value)}&limit=10&api_key=${process.env.REACT_APP_GIPHY_API_KEY}`
        const response = await fetch(url)
        const { data : gifs } = await response.json()
        return gifs.map((dataGif:any)=>{
            return {
            id:dataGif.id,
            title:dataGif.title,
            src:dataGif.images.downsized_medium.url
        }})
    }catch(err){
        console.log("error");
    }
}