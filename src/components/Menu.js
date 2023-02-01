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
            <p>Please scan or enter Carton / Order number to proceed</p>
            <form>
                <div className="row g-3 align-items-center">
                    <div className="col-auto">
                        <label for="carton_number" className="form-label">Carton #</label>
                    </div>
                    <div className="col-auto">
                        <input className="form-control" type="text" placeholder="Carton number" id="carton_number" />
                    </div>
                </div>
                <br />
                <div className="row g-3 align-items-center">
                    <div className="col-auto">
                        <label for="order_number" className="form-label">Order #</label>
                    </div>
                    <div className="col-auto">
                        <input className="form-control" type="text" placeholder="Order number" id="order_number" />
                    </div>
                </div>
                <br />
                <button type="submit" className="btn btn-primary" onClick={navigateToPacking}>Submit</button>
            </form>
        </Layout>
    );
};