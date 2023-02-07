import React, { useState, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import JSONpickData from "./data.json";
import "../styles/table.css"
import Modal from "./Modal";
import PackingInfo from "./PackingInfo";
import { useLocation } from 'react-router-dom';

// TODO: fetch all order either by ticket number or order number

export const Packing = () => {

    const [selectedOrderLine, setSelectedOrderLine] = useState();
    const [pickData, setPickData] = useState(JSONpickData);
    const [packData, setPackData] = useState([]);

    const [showModal, setShowModal] = useState(false);
    // const [isOrderLinePacked, setIsOrderLinePacked] = useState(false);

    const location = useLocation();
    const ticketNumber = location.search.split('ticketNumber=')[1];
    const orderNumber = location.search.split('orderNumber=')[1];

    // const filteredPickData = useMemo(() => {
    //     return pickData.filter(item => {
    //         return item.ticketNumber === ticketNumber || item.orderNumber === orderNumber;
    //     });
    // }, [pickData, ticketNumber, orderNumber]);

    // setPickData(filteredPickData);

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

    const showModalPromt = (bool) => {
        setShowModal(bool);
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

    const selectedPickRow = pickData.filter(data => data.orderLine === selectedOrderLine);
    const selectedPackRow = packData.filter(data => data.orderLine === selectedOrderLine);

    return (
        <Layout title="Packing" className="container table-responsive">
            {showModal ? <Modal data={selectedPickRow[0]} showModal={showModal} showModalPromt={showModalPromt} pack={pack} /> : null}
            <PackingInfo data={pickData[0]} />
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
            <Action data={selectedPickRow[0] !== undefined ? selectedPickRow[0] : selectedPackRow[0]} />
            <Alert />
        </Layout>
    );
};