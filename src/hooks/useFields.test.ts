import { act, renderHook } from "@testing-library/react-hooks";
import useFields from "./useFields";

describe("useFields", () => {
    const initialState: any = {
        x: 1,
        y: 2
    }

    it("should return initial state", () => {
        const { result } = renderHook(() => useFields(initialState))
        const [fields] = result.current;

        expect(fields).toEqual(initialState)
    })

    it("should change field value", () => {
        const { result } = renderHook(() => useFields(initialState))
        const changedState: any = {
            x: 1,
            y: 3
        }

        act(() => {
            result.current[1]({ target: { name: "y", value: 3 } } as any)
        })

        expect(result.current[0]).toEqual(changedState)
    })

})
