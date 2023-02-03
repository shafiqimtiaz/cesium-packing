import React from "react";
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';

export const Menu = () => {
    const navigate = useNavigate();
    const navigateToPacking = () => {
        navigate('/packing');
    };

    return (
        <Layout title="Menu" className="container">
            <p className="lead">Please scan or enter Carton / Order number to proceed</p>
            <form>

                <div className="input-group">
                    <span className="input-group-text">Carton #</span>
                    <input type="text" className="form-control" id="cartonNumber" placeholder="Carton number" />
                </div>
                <br />
                <div className="input-group">
                    <span className="input-group-text">Order #</span>
                    <input type="text" className="form-control" id="orderNumber" placeholder="Order number" />
                </div>
                <br />
                <button type="submit" className="btn btn-primary" onClick={navigateToPacking}>Submit</button>
            </form>
        </Layout>
    );
};