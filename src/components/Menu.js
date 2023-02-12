import React, { useState, useContext } from "react";
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';
import Utils from '../controllers/Utils';
import { GlobalContext } from "../context/GlobalState";

export const Menu = () => {

    localStorage.clear();

    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const { isTicketNumberValid, isOrderNumberValid, getCustomerName, getOrderNumber, getTicketNumber } = Utils();

    const {
        setPickOrder,
        PickData,
        addToPickData,
    } = useContext(GlobalContext);

    const { AlertDanger } = Utils();

    const handleSubmit = (e) => {
        e.preventDefault();
        let ticketNumber = document.getElementById('ticketNumber').value;
        let orderNumber = document.getElementById('orderNumber').value;
        let customerName = getCustomerName(ticketNumber, orderNumber);

        if (!ticketNumber) ticketNumber = getTicketNumber(orderNumber);
        if (!orderNumber) orderNumber = getOrderNumber(ticketNumber);

        const filteredPickData = PickData.filter(
            data => data.ticketNumber === parseInt(ticketNumber) 
        && data.orderNumber === parseInt(orderNumber));

        let isValid = isTicketNumberValid(ticketNumber) && isOrderNumberValid(orderNumber);
        if (isValid) {
            setPickOrder(ticketNumber, orderNumber, customerName);
            addToPickData(filteredPickData);
            navigate(`/packing`);
        } else {
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        }
    };

    return (
        <Layout title="Menu" className="container">
            <p className="lead">Please scan or enter Ticket / Order number to proceed</p>
            {showAlert ? <AlertDanger>Please enter VALID INFO</AlertDanger> : null}
            <form onSubmit={handleSubmit}>
                <div className="input-group w-50">
                    <span className="input-group-text">Ticket #</span>
                    <input type="text" className="form-control" id="ticketNumber" placeholder="Ticket number" />
                </div>
                <br />
                <div className="input-group w-50">
                    <span className="input-group-text">Order #</span>
                    <input type="text" className="form-control" id="orderNumber" placeholder="Order number" />
                </div>
                <br />
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </Layout>
    );
};