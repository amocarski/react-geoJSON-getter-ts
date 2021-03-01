import { fireEvent, render } from "@testing-library/react";
import GeoJSONForm from "./GeoJSONForm";

describe("GeoJSONForm", () => {
    const props: any = {
        onSubmit: jest.fn(),
        initialCoordinates: {},
        disabled: false
    }

    it("should send the request", () => {
        const { getByTestId } = render(<GeoJSONForm {...props} />)
        const submitBtn = getByTestId("submit")
        fireEvent.click(submitBtn)
        expect(props.onSubmit).toHaveBeenCalled()
    })

    it("should have disabled inputs and button", () => {
        const { getByPlaceholderText, getByTestId } = render(<GeoJSONForm {...props} disabled={true} />)

        expect(getByPlaceholderText("left")).toBeDisabled()
        expect(getByPlaceholderText("bottom")).toBeDisabled()
        expect(getByPlaceholderText("right")).toBeDisabled()
        expect(getByPlaceholderText("top")).toBeDisabled()
        expect(getByTestId("submit")).toBeDisabled()
    })

})
