import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import Utils from "../controllers/Utils";

// input item sku and ticket number [together] to pack

const PackingInfo = () => {

    const {
        OrderNumber,
        TicketNumber,
        CustomerName,
        setSelectedOrderLine
    } = useContext(GlobalContext);
    
    const { toggleRow, getOrderLine } = Utils();

    // check if ticket number and item number is entered and match with the order line 
    const handleEnter = (event) => {
        if (event.key === "Enter") {
            let ticketNumber = document.getElementById('ticketNumber').value;
            let itemNumber = document.getElementById('itemNumber').value;
            
            if (ticketNumber && itemNumber) {
                console.log(ticketNumber, itemNumber);
                setSelectedOrderLine(getOrderLine(ticketNumber, itemNumber))
            } else {
                alert('Please enter Ticket Number and Item Number');
            }
        }
    }

    return (<>
        <p className="lead">Please scan or enter Items to proceed</p>
        <div className="row">
            <div className="col-4">
                <div className="card">
                    <div className="card-header">
                        <b>Order #</b> {OrderNumber}
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><b>Customer #</b> {CustomerName}</li>
                    </ul>
                </div>
            </div>
            <div className="col-4">
                <div className="input-group">
                    <span className="input-group-text">Ticket #</span>
                    <input type="text" className="form-control" id="ticketNumber" defaultValue={TicketNumber} onKeyDown={(e) => handleEnter(e)} />
                </div>
            </div>
            <div className="col-4">
                <div className="input-group">
                    <span className="input-group-text">Item #</span>
                    <input type="text" className="form-control" id="itemNumber" onKeyDown={(e) => handleEnter(e)} />
                </div>
            </div>
        </div>
    </>

    )
};

export default PackingInfo;