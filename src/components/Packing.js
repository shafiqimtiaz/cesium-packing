import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import JSONpickData from "./data.json";
import "../styles/table.css"

export const Packing = () => {

    const [selectedOrderLine, setSelectedOrderLine] = useState();
    const [pickData, setPickData] = useState(JSONpickData);
    const [packData, setPackData] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [isOrderLinePacked, setIsOrderLinePacked] = useState(false);

    const header = ["Order Line", "SKU", "Picked Qty", "Remaining Qty", "Description", "UPC"];

    // Issue
    const toggleRow = (orderLine) => {
        if (selectedOrderLine !== orderLine) {
            setSelectedOrderLine(orderLine);
        } else {
            setSelectedOrderLine(null);
        }
    }

    // Issue
    const pack = (row, check) => {
        if (selectedOrderLine !== null) {
            let temp = Array.of(...packData, row);
            setPackData(temp.sort((a, b) => a.orderLine > b.orderLine));
            pickData.splice(pickData.indexOf(row), 1);
            setSelectedOrderLine(null);
            setShowModal(false);
        }
    }

    const unPack = (row, check) => {
        if (selectedOrderLine !== null) {
            let temp = Array.of(...pickData, row);
            setPickData(temp.sort((a, b) => a.orderLine > b.orderLine));
            packData.splice(packData.indexOf(row), 1);
            setSelectedOrderLine(null);
        }
    }


    const navigate = useNavigate();
    const navigateToMenu = () => {
        navigate('/');
    };

    const showModalPromt = () => {
        setShowModal(true);
    };

    const Action = (prop) => {
        return (
            <div
                className="container text-center mb-3"
            // style={{ position: "fixed", bottom: "0px", right: "0px" }}
            >
                <button className="btn btn-primary mr-2" onClick={navigateToMenu}>Back</button>
                <button className="btn btn-warning mx-2" onClick={showModalPromt}>Pack</button>
                <button className="btn btn-danger mr-2" onClick={() => unPack(prop.data)}>Unpack</button>
                <button className="btn btn-success mx-2" >Submit</button>
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
                                <input type="text" className="form-control" id="itemCount" defaultValue={prop.data !== undefined ? prop.data.remainingQty : ""} />
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
                            <button type="button" className="btn btn-primary" onClick={() => pack(prop.data)}>
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

    const TableBody = (prop) => {
        const rows = prop.data.map((row, index) => {
            return (
                // Issue
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


    const Alert = () => {
        return (
            <div className="container">
                <div className="alert alert-info" role="alert">
                    Tasks
                </div>
                <div className="alert alert-success" role="alert">
                    Pack/Unpack
                    Show modal prompt with remaining qty
                </div>
                <div className="alert alert-warning" role="alert">
                    Fetch data from API<br />
                    Populate packing menu with data
                </div>
                <div className="alert alert-danger" role="alert">
                    User should not be able to pack/unpack if the order line is not selected<br />
                    Packing without modal prompt when ticket number and item sku/upc is entered<br />
                    Packing with modal prompt using specific item count
                </div>
            </div>
        )
    };

    const filterdPickData = pickData.filter(data => data.orderLine === selectedOrderLine);
    const filterdPackData = packData.filter(data => data.orderLine === selectedOrderLine);

    return (
        <Layout title="Packing" className="container table-responsive">
            {showModal ? <Modal data={filterdPickData[0]} /> : null}
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
                <TableBody data={pickData} />
            </table>
            <br />
            <h3>PACKED</h3>
            <table className="table table-bordered table-hover border-primary">
                <TableHeader />
                <TableBody data={packData} />
            </table>
            <br />
            <Action data={filterdPickData[0] !== undefined ? filterdPickData[0] : filterdPackData[0]} />
            <Alert />
        </Layout>
    );
};