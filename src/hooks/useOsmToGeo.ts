import osmtogeojson from "osmtogeojson";
import { useEffect, useState } from "react";
import { IGeoJSON } from "../models/IGeoJSON";
import { ICoordinates } from "../models/ICoordinates";
import useFetch from "./useFetch";

const useOsmToGeo = (coordinates: ICoordinates) => {
    const [coordinatesState, setCoordinatesState] = useState<ICoordinates>(coordinates)
    const [geoJSON, setGeoJSON] = useState<IGeoJSON>({
        type: "FeatureCollection",
        features: []
    });
    const apiUrl = `https://api.openstreetmap.org/api/0.6/map?bbox=${coordinatesState.left},${coordinatesState.bottom},${coordinatesState.right},${coordinatesState.top}`
    const { data, isLoading, isError, errorMessage, fetchApi } = useFetch(apiUrl);

    useEffect(() => {
        if (!isError && data) {
            setGeoJSON(osmtogeojson(data))
        }
    }, [data, isError])

    useEffect(() => {
        fetchApi(apiUrl)
    }, [coordinates])

    const fetch = (coordinates: ICoordinates) => {
        setCoordinatesState(coordinates)
    }

    return {
        geoJSON,
        isLoading,
        isError,
        errorMessage,
        fetch
    }
}

export default useOsmToGeo;