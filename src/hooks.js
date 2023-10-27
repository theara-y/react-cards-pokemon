import { useEffect, useState } from 'react';
import axios from 'axios';

export const useFlip = () => {
    const [isFacingUp, setIsFacingUp] = useState(true);
    const flipCard = () => {
        setIsFacingUp(!isFacingUp);
    };
    return [isFacingUp, flipCard];
};

export const useAxios = (key, baseUrl) => {
    const [response, setResponse] = useLocalStorage(key);

    const addData = async (format, endpoint = "") => {
        const res = await axios.get(baseUrl + endpoint);
        setResponse(data => {
            return [...data, format(res)]
        });
    };

    const clearData = () => {
        setResponse([]);
    };

    return [response, addData, clearData];
};

const useLocalStorage = (key, initialValue = []) => {
    if (localStorage.getItem(key)) {
        initialValue = JSON.parse(localStorage.getItem(key));
    }
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key]);

    return [value, setValue]
}