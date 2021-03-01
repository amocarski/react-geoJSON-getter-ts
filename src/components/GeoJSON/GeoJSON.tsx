import { Alert, AlertIcon, Box, Heading, Spinner, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import useOsmToGeo from "../../hooks/useOsmToGeo";
import { ICoordinates } from "../../models/ICoordinates";
import FeaturesList from "./FeaturesList";
import GeoJSONForm from "./GeoJSONForm";

const GeoJSON: FC = () => {
    //very wide coordinates
    const initialCoordinates: ICoordinates = {
        left: 10.186583,
        bottom: 47.643155,
        right: 10.279354,
        top: 47.693329
    }
    //invalid coordinates
    // const initialCoordinates = {
    //     left: 10.186583,
    //     bottom: 47.793155,
    //     right: 10.1879354,
    //     top: 47.643329
    // }
    const { geoJSON, isLoading, isError, errorMessage, fetch } = useOsmToGeo(initialCoordinates)

    return (
        <>
            <GeoJSONForm data-testid="form" initialCoordinates={initialCoordinates} disabled={isLoading} onSubmit={fetch} />
            <Box mt="6">
                <Box data-testid="header" mb="6">
                    <Heading size="md">Features list</Heading>
                    <Text fontSize="sm" color="gray.500">Click on relation row to get details</Text>
                </Box>
                {!isLoading && !isError ? <FeaturesList data-testid="features-list" geoJSON={geoJSON} /> : null}
                {isLoading ? <Spinner data-testid="spinner" /> : null}
                {!isError ?
                    null
                    :
                    <Alert data-testid="alert" status="warning">
                        <AlertIcon />
                        {errorMessage}
                    </Alert>
                }
            </Box>
        </>
    )
}

export default GeoJSON;