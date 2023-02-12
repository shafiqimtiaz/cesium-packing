import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const Utils = () => {

    const {
        PickData,
        PackData,
        SelectedOrderLine,
        setSelectedOrderLine,
        addToPackData,
        addToPickData,
        removeFromPackData,
        removeFromPickData,
        setShowModal,
    } = useContext(GlobalContext);

    const pack = (row) => {
        if (SelectedOrderLine !== null) {
            let temp = Array.of(...PackData, row);
            addToPackData(temp.sort((a, b) => a.orderLine - b.orderLine));
            removeFromPickData(row);
            setSelectedOrderLine(null);
            setShowModal(false);
        }
    }

    const unPack = (row) => {
        if (SelectedOrderLine !== null) {
            let temp = Array.of(...PickData, row);
            addToPickData(temp.sort((a, b) => a.orderLine - b.orderLine));
            removeFromPackData(row);
            setSelectedOrderLine(null);
        }
    }

    const orderLineExists = (orderLine, data) => {
        if (!data || !Array.isArray(data) || !orderLine) {
            return false;
        }
        for (let i = 0; i < data.length; i++) {
            if (typeof data[i] !== 'object' || data[i] === null) {
                return false;
            }
            if (!data[i].hasOwnProperty('orderLine')) {
                return false;
            }
        }
        return data.some(data => data.orderLine === orderLine);
    }

    const isTicketNumberValid = (ticketNumber) => {
        let isValid = false;
        PickData.forEach(data => {
            if (data.ticketNumber === parseInt(ticketNumber)) {
                isValid = true;
            }
        });
        return isValid;
    };

    const isOrderNumberValid = (orderNumber) => {
        let isValid = false;
        PickData.forEach(data => {
            if (data.orderNumber === parseInt(orderNumber)) {
                isValid = true;
            }
        });
        return isValid;
    };

    const getOrderLine = (ticketNumber, itemNumber) => {
        let orderLine = '';
        if (isTicketNumberValid(ticketNumber)) {
            PickData.forEach(data => {
                if (data.upc === itemNumber) {
                    orderLine = data.orderLine;
                }
            });
            return orderLine;
        }
    };

    const getTicketNumber = (orderNumber) => {
        if (isOrderNumberValid(orderNumber)) {
            let ticketNumber = '';
            PickData.forEach(data => {
                if (data.orderNumber === parseInt(orderNumber)) {
                    ticketNumber = data.ticketNumber;
                }
            });
            return ticketNumber;
        }
    };

    const getOrderNumber = (ticketNumber) => {
        if (isTicketNumberValid(ticketNumber)) {
            let orderNumber = '';
            PickData.forEach(data => {
                if (data.ticketNumber === parseInt(ticketNumber)) {
                    orderNumber = data.orderNumber;
                }
            });
            return orderNumber;
        }
    };

    const getCustomerName = (ticketNumber, orderNumber) => {
        let customerName = '';
        if (isTicketNumberValid(ticketNumber)) {
            PickData.forEach(data => {
                if (data.ticketNumber === parseInt(ticketNumber)) {
                    customerName = data.customerName;
                }
            });
            return customerName;
        } else if (isOrderNumberValid(orderNumber)) {
            PickData.forEach(data => {
                if (data.orderNumber === parseInt(orderNumber)) {
                    customerName = data.customerName;
                }
            });
            return customerName;
        }
    };

    const toggleRow = (orderLine) => {
        if (SelectedOrderLine !== orderLine) {
            setSelectedOrderLine(orderLine);
        } else {
            setSelectedOrderLine(null);
        }
    }

    const AlertInfo = ({children}) => {
        return (
            <div className="alert alert-info" role="alert">
                {children}
            </div>
        )
    }

    const AlertSuccess = ({children}) => {
        return (
            <div className="alert alert-success" role="alert">
                {children}
            </div>
        )
    }

    const AlertWarning = ({children}) => {
        return (
            <div className="alert alert-warning" role="alert">
                {children}
            </div>
        )
    }
    
    const AlertDanger = ({children}) => {
        return (
            <div className="alert alert-danger" role="alert">
                {children}
            </div>
        )
    }

    return {
        pack: pack,
        unPack: unPack,
        orderLineExists: orderLineExists,
        isTicketNumberValid: isTicketNumberValid,
        isOrderNumberValid: isOrderNumberValid,
        getOrderLine: getOrderLine,
        getTicketNumber: getTicketNumber,
        getOrderNumber: getOrderNumber,
        getCustomerName: getCustomerName,
        toggleRow: toggleRow,
        AlertInfo: AlertInfo,
        AlertSuccess: AlertSuccess,
        AlertWarning: AlertWarning,
        AlertDanger: AlertDanger,
    }
};

export default Utils;