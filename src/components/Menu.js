import React from "react";
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';
import JSONpickData from "./data.json";

// convert the alert to a notification banner

export const Menu = () => {
    const navigate = useNavigate();

    const isTicketNumberValid = (ticketNumber) => {
        let isValid = false;
        JSONpickData.forEach(data => {
            if (data.ticketNumber === parseInt(ticketNumber)) {
                isValid = true;
            }
        });
        return isValid;
    };

    const isOrderNumberValid = (orderNumber) => {
        let isValid = false;
        JSONpickData.forEach(data => {
            if (data.orderNumber === parseInt(orderNumber)) {
                isValid = true;
            }
        });
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const ticketNumber = document.getElementById('ticketNumber').value;
        const orderNumber = document.getElementById('orderNumber').value;
        if (isTicketNumberValid(ticketNumber) || isOrderNumberValid(orderNumber)) {
            navigate(`/packing?ticketNumber=${ticketNumber}&orderNumber=${orderNumber}`);
        } else {
            alert(`Ticket number / Order number is not valid`);
        }
    };

    return (
        <Layout title="Menu" className="container">
            <p className="lead">Please scan or enter Ticket / Order number to proceed</p>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <span className="input-group-text">Ticket #</span>
                    <input type="text" className="form-control" id="ticketNumber" placeholder="Ticket number" />
                </div>
                <br />
                <div className="input-group">
                    <span className="input-group-text">Order #</span>
                    <input type="text" className="form-control" id="orderNumber" placeholder="Order number" />
                </div>
                <br />
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </Layout>
    );
};