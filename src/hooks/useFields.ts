import { ChangeEvent, useState } from "react";

const useFields = <T>(initialState: T): [T, (event: ChangeEvent<HTMLInputElement>) => void] => {
    const [fields, setValues] = useState<T>(initialState);

    return [
        fields,
        (event: ChangeEvent<HTMLInputElement>) => {
            setValues({
                ...fields,
                [event.target.name]: parseFloat(event.target.value)
            });
        }
    ];
}

export default useFields;
