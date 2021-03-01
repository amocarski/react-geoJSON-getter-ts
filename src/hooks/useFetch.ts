import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

const useFetch = (url: string) => {
    const [data, setData] = useState(null);
    const [urlState, setUrlState] = useState<string>(url)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            setIsError(false);
            setIsLoading(true);

            try {
                const result: AxiosResponse<any> = await axios(urlState);
                setData(result.data);
            } catch (error) {
                setErrorMessage(error.response.data)
                setIsError(true);
            }

            setIsLoading(false);
        };

        fetchData();
    }, [urlState]);

    return { data, isLoading, isError, errorMessage, fetchApi: setUrlState };
}

export default useFetch;