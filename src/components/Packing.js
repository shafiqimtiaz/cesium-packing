import React, { useContext } from "react";
import Layout from './Layout';
import "../styles/table.css"
import Modal from "./Modal";
import PackingInfo from "./PackingInfo";
import { GlobalContext } from "../context/GlobalState";
import { Action } from "../controllers/Action";
import Utils from "../controllers/Utils";
import Table from "./Table";

// TODO: fetch all order either by ticket number or order number

export const Packing = () => {

    const {
        PickData,
        PackData,
        SelectedOrderLine,
        ShowModal,
    } = useContext(GlobalContext);

    const { TableHeader, TableBody } = Table();
    const { orderLineExists } = Utils();

    let selectedPickRow = [], selectedPackRow = [];

    if (orderLineExists(SelectedOrderLine, PickData)) {
        selectedPickRow = PickData.filter(data => data.orderLine === SelectedOrderLine)
    } else if (orderLineExists(SelectedOrderLine, PackData)) {
        selectedPackRow = PackData.filter(data => data.orderLine === SelectedOrderLine)
    }

    return (
        <Layout title="Packing" className="container table-responsive">
            {ShowModal ? <Modal data={selectedPickRow[0]} /> : null}
            <PackingInfo />
            <br /><hr />
            <h3>PENDING</h3>
            <table className="table table-bordered table-hover border-primary">
                <TableHeader />
                <TableBody data={PickData} />
            </table>
            <br />
            <h3>PACKED</h3>
            <table className="table table-bordered table-hover border-primary">
                <TableHeader />
                <TableBody data={PackData} />
            </table>
            <br />               
            {selectedPickRow.length > 0 ? <Action data={selectedPickRow[0]} />
            : (selectedPackRow.length > 0 ? <Action data={selectedPackRow[0]} /> : null)}
        </Layout>
    );
};