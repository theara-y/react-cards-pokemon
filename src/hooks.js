import { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

export const useFlip = () => {
    const [isFacingUp, setIsFacingUp] = useState(true);
    const flipCard = () => {
        setIsFacingUp(!isFacingUp);
    };
    return [isFacingUp, flipCard];
};

export const useAxios = (url) => {
    const [response, setResponse] = useState([]);

    const addData = async () => {
        const res = await axios.get(url);
        setResponse(data => {
            return [...data, {image: res.data.cards[0].image, id: uuid()}]
        });
    };

    return [response, addData];
};