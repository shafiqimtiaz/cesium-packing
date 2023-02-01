import React from "react";
import { useNavigate } from 'react-router-dom';

export const Action = () => {
    const navigate = useNavigate();
    const navigateToMenu = () => {
        navigate('/');
    };

    return (
        <>
            <button className="btn btn-primary mr-2" onClick={navigateToMenu}>Back</button>
            <button className="btn btn-success mx-2">Pack</button>
            <button className="btn btn-warning mr-2">Unpack</button>
            <button className="btn btn-danger mx-2">Clear</button>
        </>
    );
}
