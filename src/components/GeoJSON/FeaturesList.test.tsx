import { render, RenderResult } from "@testing-library/react";
import React from "react";
import { IGeoJSON } from "../../models/IGeoJSON";
import FeaturesList from "./FeaturesList";


describe("FeaturesList", () => {
    const geoJSON: IGeoJSON = {
        type: "FeatureCollection",
        features: [{
            "type": "Feature",
            "id": "relation/32842",
            "properties": {
                "timestamp": "2019-08-02T16:53:11Z",
                "version": 48,
                "changeset": 72949751,
                "user": "jeka p",
                "uid": 2385757,
                "ref": "St 1318",
                "route": "road",
                "type": "route",
                "id": "relation/32842"
            },
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [
                        10.1897096,
                        47.6665395
                    ],
                ]
            }
        }]
    }
    let component: RenderResult;
    beforeEach(() => {
        component = render(<FeaturesList geoJSON={geoJSON} />);
    })

    it("should render the list", () => {
        const { queryByTestId } = component;
        expect(queryByTestId("row")).toBeInTheDocument();
    })
    it("should feature item has correct id displayed", () => {
        const { queryByTestId } = component;
        expect(queryByTestId("item")).toHaveTextContent(geoJSON.features[0].id);
    })

})