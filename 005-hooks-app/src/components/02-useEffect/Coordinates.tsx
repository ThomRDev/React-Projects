import { useEffect, useState } from "react";

const useCoords = () => {
    const [coordinates,setCoordinates] = useState({
        lat:null,lng:null,loading : true
    })
    let geoId:number;
    useEffect(()=>{
        // eslint-disable-next-line
        geoId = window.navigator.geolocation.watchPosition((position)=>{
            setCoordinates({
                lat:position.coords.latitude as any,
                lng : position.coords.latitude as any,
                loading : false
            });
        });
        return () => {
            window.navigator.geolocation.clearWatch(geoId)
        };
    })
    return { ...coordinates}
}

const Coordinates = () => {
    
    const { lat,lng,loading } = useCoords()

    return (
        <div>
            { loading ? <p>Loading ...</p> : 
                <div>
                    <p>Latitude <span>{ lat }</span></p>
                    <p>Longitude <span>{ lng }</span></p>
                </div>
            }
        </div>
    );
}

export default Coordinates