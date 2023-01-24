import { useEffect, useState } from "react"
import { getGifs, IGif} from "../helpers/getGif"

export const useFetchGifs = (value : string)=>{
    const [state,setState] = useState({ data : [] as IGif[], loading : true})
    useEffect(()=>{
        getGifs(value)
        .then(data=>{
            // data?.length &&
            setTimeout(()=>{
                setState({
                    data,
                    loading:false
                })
            },1000)
        })
    },[value])
    return state
}

