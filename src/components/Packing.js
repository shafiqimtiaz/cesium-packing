import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import JSONpickData from "./data.json";
import "../styles/table.css"

export const Packing = () => {

    const [selectedOrderLine, setSelectedOrderLine] = useState();
    const [packData, setPackData] = useState([]);
    const [pickData, setPickData] = useState(JSONpickData);

    const [showModal, setShowModal] = useState(false);

    const header = ["Order Line", "SKU", "Picked Qty", "Remaining Qty", "Description", "UPC"];

    const toggleRow = (orderLine) => {
        if (selectedOrderLine === orderLine) {
            setSelectedOrderLine(null);
        } else {
            setSelectedOrderLine(orderLine);
        }
    }

    const packRow = () => {
        setPackData(Array.of(pickData[selectedOrderLine], ...packData,));
        pickData.splice(selectedOrderLine, 1);
        setSelectedOrderLine(null);
        setShowModal(false)
    }
    const unPackRow = () => {
        setPickData(Array.of(packData[selectedOrderLine], ...pickData,));
        packData.splice(selectedOrderLine, 1);
        console.log(packData);
        setSelectedOrderLine(null);
    }

    const Action = () => {
        const navigate = useNavigate();
        const navigateToMenu = () => {
            navigate('/');
        };

        const showModal = () => {
            setShowModal(true);
        }

        return (
            <div className="container text-center mb-3">
                <button className="btn btn-primary mr-2" onClick={navigateToMenu}>Back</button>
                <button className="btn btn-success mx-2" onClick={showModal}>Pack</button>
                <button className="btn btn-warning mr-2" onClick={unPackRow}>Unpack</button>
            </div>
        );
    }

    const Modal = (prop) => {
        return (
            <div
                className={`modal fade ${showModal ? 'show' : ''}`}
                tabIndex="-1"
                role="dialog"
                style={{ display: showModal ? 'block' : 'none' }}
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Select number of <b>{prop.data !== undefined ? prop.data.sku : ""}</b> to pack</h5>
                        </div>
                        <div className="modal-body">
                            <div className="input-group">
                                <span className="input-group-text">Item Count</span>
                                <input type="text" className="form-control" id="itemCount" placeholder={prop.data !== undefined ? prop.data.remainingQty : ""} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                                onClick={() => setShowModal(false)}
                            >
                                Close
                            </button>
                            <button type="button" className="btn btn-primary" onClick={packRow}>
                                Pack
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const TableHeader = () => {
        return (
            <thead className="thead-dark">
                <tr>
                    {header.map((key, index) => (
                        <th scope="col" key={index}>{key.toUpperCase()}</th>
                    ))}
                </tr>
            </thead>
        );
    };

    const TableBody = (data) => {
        const rows = data.prop.map((row, index) => {
            // has issues with the selectedOrderLine
            return (
                <tr key={index} className={row.orderLine === selectedOrderLine ? 'table-active' : ''}
                    onClick={() => toggleRow(row.orderLine)}>
                    <td>{row.orderLine}</td>
                    <td>{row.sku}</td>
                    <td>{row.pickedQty}</td>
                    <td>{row.remainingQty}</td>
                    <td>{row.description}</td>
                    <td>{row.upc}</td>
                </tr >
            );

        });
        return <tbody>{rows}</tbody>;
    };

    return (
        <Layout title="Packing" className="container table-responsive">
            <p className="lead">Please scan or enter Items to proceed</p>
            <div className="row">
                <div className="col-6">
                    <div className="card">
                        <div className="card-header">
                            <b>Order</b> {pickData[0].orderNumber}
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><b>Ticket ID:</b> {pickData[0].ticketNumber}</li>
                            <li className="list-group-item"><b>Customer:</b> XXX</li>
                            <li className="list-group-item"><b>Instructions:</b> XXX</li>
                        </ul>
                    </div>
                </div>
                <div className="col-6">
                    <div className="input-group">
                        <span className="input-group-text">Ticket #</span>
                        <input type="text" className="form-control" id="ticketNumber" />
                    </div>
                    <br />
                    <div className="input-group">
                        <span className="input-group-text">Item #</span>
                        <input type="text" className="form-control" id="itemNumber" />
                    </div>
                </div>
            </div>
            <br /><hr />
            <h3>PENDING</h3>
            <table className="table table-bordered table-hover border-primary">
                <TableHeader />
                <TableBody prop={pickData} />
            </table>
            <br />
            <h3>PACKED</h3>
            <table className="table table-bordered table-hover border-primary">
                <TableHeader />
                <TableBody prop={packData} />
            </table>
            <br />
            <Action />
            <Modal data={pickData[selectedOrderLine - 1]} />
        </Layout>
    );
};