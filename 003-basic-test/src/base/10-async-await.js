import Axios from "axios"


// const Axios = require("axios")
// require("dotenv").config()

export const getGift = async () => {
    try {
        const { data } = await Axios.get(`https://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY_GIFS}`)
        const { url } = data.data.images.original;
        return url
    } catch{
        return "API - ERROR"
    }
}
getGift()