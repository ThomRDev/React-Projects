import { useEffect, useState } from "react"
import { getGif } from "../helpers/getGif"
// export interface DataHook{
//     data : any[],
//     loading : boolean
// }

export const useFetchGifts = (value : string)=>{
    const [state,setState] = useState({ data : [] as object[], loading : true})
    useEffect(()=>{
        getGif(value)
        .then(data=>{
            // data?.length &&
            setTimeout(()=>{
                setState({
                    data,
                    loading:false
                })
            },1000)
        })
        // eslint-disable-next-line
    },[value])
    return state
}

