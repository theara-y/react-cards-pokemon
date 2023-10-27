import { useState } from 'react';
import axios from 'axios';

export const useFlip = () => {
    const [isFacingUp, setIsFacingUp] = useState(true);
    const flipCard = () => {
        setIsFacingUp(!isFacingUp);
    };
    return [isFacingUp, flipCard];
};

export const useAxios = (baseUrl) => {
    const [response, setResponse] = useState([]);

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