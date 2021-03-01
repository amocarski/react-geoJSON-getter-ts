import { act, renderHook } from "@testing-library/react-hooks";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { IGeoJSON } from "../models/IGeoJSON";
import useOsmToGeo from "./useOsmToGeo";

describe("useOsmToGeo", () => {
    const initialCoordinates = {
        left: 10.186583,
        bottom: 47.793155,
        right: 10.1879354,
        top: 47.643329
    }
    const url = "test.com";
    const mock = new MockAdapter(axios);
    let mockData = "response";
    const osmMockResponse: IGeoJSON = {
        type: "FeatureCollection",
        features: []
    }

    it("should return data with a successful request", async () => {
        mock.onGet(url).reply(200, mockData);
        const { result, waitForNextUpdate } = renderHook(() => useOsmToGeo(initialCoordinates))

        await waitForNextUpdate();

        expect(result.current.geoJSON).toEqual(osmMockResponse)
        expect(result.current.isLoading).toBeFalsy()
    })
    it("should return data with a successful request on fetch function call", async () => {
        mock.onGet(url).reply(200, osmMockResponse);
        const { result } = renderHook(() => useOsmToGeo(initialCoordinates))

        await act(async () => {
            result.current.fetch(initialCoordinates);
            expect(result.current.isLoading).toBeTruthy()
        })

        expect(result.current.geoJSON).toEqual(osmMockResponse)
        expect(result.current.isLoading).toBeFalsy()
    })
    it("should return error with an unsuccessful request", async () => {
        mock.onGet(url).reply(400, mockData);
        const { result, waitForNextUpdate } = renderHook(() => useOsmToGeo(initialCoordinates))

        await waitForNextUpdate();

        expect(result.current.geoJSON.features).toEqual([]);
        expect(result.current.isError).toBeTruthy()
        expect(result.current.isLoading).toBeFalsy()
    })
})