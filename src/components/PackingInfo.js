import React from "react";

// input item sku and ticket number [together] to pack

const PackingInfo = (props) => {
    return (<>
        <p className="lead">Please scan or enter Items to proceed</p>
        <div className="row">
            <div className="col-6">
                <div className="card">
                    <div className="card-header">
                        <b>Order</b> {props.data.orderNumber}
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><b>Ticket ID:</b> {props.data.ticketNumber}</li>
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
    </>

    )
};

export default PackingInfo;