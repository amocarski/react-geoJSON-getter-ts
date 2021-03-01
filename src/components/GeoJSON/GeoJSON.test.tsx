import React from "react";
import { render } from "@testing-library/react";
import GeoJSON from "./GeoJSON";

let mockHookResponse = {
    isLoading: true,
    isError: false,
    geoJSON: {
        type: "",
        features: [{ a: 1 }]
    },
    errorMessage: ""
}

jest.mock('../../hooks/useOsmToGeo', () => ({
    __esModule: true,
    default: () => mockHookResponse
}))

describe("GeoJSON", () => {
    afterEach(() => {
        jest.resetModules();
    })

    it("should render loading spinner while loading", () => {
        const { queryByTestId } = render(<GeoJSON />)

        expect(queryByTestId("spinner")).toBeInTheDocument();
    })
    it("should render component without errors where coordinates are valid", () => {
        mockHookResponse.isLoading = false;
        const { queryByTestId } = render(<GeoJSON />)

        expect(queryByTestId("alert")).not.toBeInTheDocument();
        expect(queryByTestId("header")).toBeInTheDocument();
        expect(queryByTestId("spinner")).not.toBeInTheDocument();
        expect(queryByTestId("features-list")).not.toBeInTheDocument();
    })
    it("should render alert where any errors", () => {
        mockHookResponse.isLoading = false;
        mockHookResponse.isError = true;
        const { queryByTestId } = render(<GeoJSON />)

        expect(queryByTestId("alert")).toBeInTheDocument();
        expect(queryByTestId("header")).toBeInTheDocument();
        expect(queryByTestId("spinner")).not.toBeInTheDocument();
        expect(queryByTestId("features-list")).not.toBeInTheDocument();
    })
})
