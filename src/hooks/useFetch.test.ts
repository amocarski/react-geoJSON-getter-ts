import { act, renderHook } from "@testing-library/react-hooks"
import axios from "axios"
import useFetch from "./useFetch"
import MockAdapter from "axios-mock-adapter";

describe("useFetch", () => {
    const url = "test.com";
    const mock = new MockAdapter(axios);
    let mockData = "response";

    it("should return data with a successful request", async () => {
        mock.onGet(url).reply(200, mockData);
        const { result, waitForNextUpdate } = renderHook(() => useFetch(url))
        expect(result.current.data).toBeNull();

        await waitForNextUpdate();

        expect(result.current.data).toBe(mockData)
        expect(result.current.isLoading).toBeFalsy()
    })
    it("should return data with a successful request on fetch function call", async () => {
        mock.onGet(url).reply(200, mockData);
        const { result } = renderHook(() => useFetch(url))
        expect(result.current.data).toBeNull();

        await act(async () => {
            result.current.fetchApi(url);
            expect(result.current.isLoading).toBeTruthy()
        })

        expect(result.current.data).toBe(mockData)
        expect(result.current.isLoading).toBeFalsy()
    })
    it("should return error with an unsuccessful request", async () => {
        mockData = "error response"
        mock.onGet(url).reply(400, mockData);
        const { result, waitForNextUpdate } = renderHook(() => useFetch(url))
        expect(result.current.data).toBeNull();

        await waitForNextUpdate();

        expect(result.current.isError).toBeTruthy()
        expect(result.current.errorMessage).toBe(mockData)
        expect(result.current.isLoading).toBeFalsy()
    })
})