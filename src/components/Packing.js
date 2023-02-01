import React, { useEffect } from "react";
import Layout from './Layout';
import { Action } from "./Action";

export const Packing = () => {

    const header = ["Order Line", "SKU", "Picked Qty", "Remaining Qty", "Description", "UPC"];

    const fetchData = [
        { "orderLine": 1, "sku": "101-0909", "pickedQty": 10, "remainingQty": 5, "description": "iPhone 12", "upc": "123456789012", },
        { "orderLine": 2, "sku": "101-0910", "pickedQty": 100, "remainingQty": 50, "description": "iPhone 12 Pro", "upc": "123456789013", }
    ];

    const packData = [];

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

    const TableBody = () => {
        return (
            <tbody>
                {fetchData.map((item, index) => (
                    <tr key={index}>
                        <td>{item.orderLine}</td>
                        <td>{item.sku}</td>
                        <td>{item.pickedQty}</td>
                        <td>{item.remainingQty}</td>
                        <td>{item.description}</td>
                        <td>{item.upc}</td>
                    </tr>
                ))}
            </tbody>
        );
    };

    return (
        <Layout title="Packing" className="container table-responsive">
            <p>Please scan or enter Items to proceed</p>

            <hr />
            <h3>PENDING</h3>
            <table className="table table-bordered">
                <TableHeader />
                <TableBody />
            </table>
            <hr />
            <h3>PACKED</h3>
            <table className="table table-bordered">
                <TableHeader />
                <TableBody />
            </table>
            <br />
            <Action />
        </Layout>
    );
};