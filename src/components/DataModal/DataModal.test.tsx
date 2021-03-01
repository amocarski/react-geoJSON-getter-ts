import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import DataModal from "./DataModal";


describe("DataModal", () => {
    const GeoJSON = {}

    it("should show the children and a close button", async () => {
        const handleClose = jest.fn();
        const { queryByTestId, getByRole } = render(<DataModal content={GeoJSON} isOpen={true} onClose={handleClose} />);

        expect(queryByTestId("modal-title")).toBeTruthy();
        fireEvent.click(getByRole("button"))
        expect(handleClose).toHaveBeenCalledTimes(1);
    })

    it("shouldn't be visible when no needed", async () => {
        const handleClose = jest.fn();
        const { queryByTestId } = render(<DataModal content={GeoJSON} isOpen={false} onClose={handleClose} />);

        expect(queryByTestId("modal-title")).toBeFalsy();
    })


    it("should close", async () => {
        const handleClose = jest.fn();
        const { queryByTestId, rerender } = render(<DataModal content={GeoJSON} isOpen={true} onClose={handleClose} />);

        expect(queryByTestId("modal-title")).toBeInTheDocument();
        rerender(<DataModal content={GeoJSON} isOpen={false} onClose={handleClose} />)

        await waitFor(() => {
            expect(queryByTestId("modal-title")).not.toBeInTheDocument()
        })
    })

})