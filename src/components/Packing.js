import React, { useEffect } from "react";
import Layout from './Layout';
import { Action } from "./Action";

export const Packing = () => {

    const header = ["Order Line", "SKU", "Picked Qty", "Remaining Qty", "Description", "UPC"];

    const pickData = [
        { "orderLine": 1, "sku": "101-0909", "pickedQty": 10, "remainingQty": 5, "description": "iPhone 12", "upc": "123456789012", },
        { "orderLine": 2, "sku": "101-0910", "pickedQty": 100, "remainingQty": 50, "description": "iPhone 12 Pro", "upc": "123456789013", },
    ];

    const packData = [{ "orderLine": 3, "sku": "101-0911", "pickedQty": 1000, "remainingQty": 500, "description": "iPhone 12 Pro Max", "upc": "123456789014", }];

    useEffect(() => { }, []);

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

    //create a table body component using passed in data
    const TableBody = (data) => {
        const rows = data.prop.map((row, index) => {
            return (
                <tr key={index}>
                    <td>{row.orderLine}</td>
                    <td>{row.sku}</td>
                    <td>{row.pickedQty}</td>
                    <td>{row.remainingQty}</td>
                    <td>{row.description}</td>
                    <td>{row.upc}</td>
                </tr>
            );
        });
        return <tbody>{rows}</tbody>;
    };

    return (
        <Layout title="Packing" className="container table-responsive">
            <p className="lead">Please scan or enter Items to proceed</p>
            <div className="row">
                <div className="col-4">
                    <div className="card">
                        <div className="card-header">
                            <b>Order</b> XXX
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><b>Carton ID:</b> XXX</li>
                            <li className="list-group-item"><b>Customer:</b> XXX</li>
                            <li className="list-group-item"><b>Instructions:</b> XXX</li>
                        </ul>
                    </div>
                </div>
                <div className="col-4">
                    <div className="input-group">
                        <span className="input-group-text">Carton #</span>
                        <input type="text" className="form-control" id="cartonNumber" />
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
            <table className="table table-bordered table-striped table-hover border-primary border-2">
                <TableHeader />
                <TableBody prop={pickData} />
            </table>
            <br />
            <h3>PACKED</h3>
            <table className="table table-bordered table-striped table-hover border-primary border-2">
                <TableHeader />
                <TableBody prop={packData} />
            </table>
            <br />
            <Action />
        </Layout>
    );
};