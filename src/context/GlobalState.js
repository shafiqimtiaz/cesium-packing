import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";
import JSONpickData from "../data.json";

const initialState = {
    PickData: localStorage.getItem("PickData") ? JSON.parse(localStorage.getItem("PickData")) : JSONpickData,
    PackData: localStorage.getItem("PackData") ? JSON.parse(localStorage.getItem("PackData")) : [],
    OrderNumber: localStorage.getItem("OrderNumber") ? JSON.parse(localStorage.getItem("OrderNumber")) : null,
    TicketNumber: localStorage.getItem("TicketNumber") ? JSON.parse(localStorage.getItem("TicketNumber")) : null,
    CustomerName: localStorage.getItem("CustomerName") ? JSON.parse(localStorage.getItem("CustomerName")) : null,
    SelectedOrderLine: null,
    ShowModal: false,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // whenever the state changes, save it to local storage
    useEffect(() => {
        localStorage.setItem("PickData", JSON.stringify(state.PickData));
        localStorage.setItem("PackData", JSON.stringify(state.PackData));
        localStorage.setItem("OrderNumber", JSON.stringify(state.OrderNumber));
        localStorage.setItem("TicketNumber", JSON.stringify(state.TicketNumber));
        localStorage.setItem("CustomerName", JSON.stringify(state.CustomerName));
        localStorage.setItem("SelectedOrderLine", JSON.stringify(state.SelectedOrderLine));
        localStorage.setItem("ShowModal", JSON.stringify(state.ShowModal));
    }, [state]);

    //actions
    const addToPackData = (Item) => {
        dispatch({ type: "ADD_ITEM_TO_PACKED", payload: Item });
    };
    const addToPickData = (Item) => {
        dispatch({ type: "ADD_ITEM_TO_PICKED", payload: Item });
    };
    const removeFromPackData = (SelectedOrderLine) => {
        dispatch({ type: "REMOVE_ITEM_FROM_PACKED", payload: SelectedOrderLine });
    };
    const removeFromPickData = (SelectedOrderLine) => {
        dispatch({ type: "REMOVE_ITEM_FROM_PICKED", payload: SelectedOrderLine });
    };
    const setPickOrder = (TicketNumber, OrderNumber, CustomerName) => {
        dispatch({
            type: "SET_PICK_ORDER", payload: {
                TicketNumber,
                OrderNumber,
                CustomerName
            }
        });
    };
    const setSelectedOrderLine = (SelectedOrderLine) => {
        dispatch({ type: "SET_SELECTED_ORDER_LINE", payload: SelectedOrderLine });
    };
    const setShowModal = (ShowModal) => {
        dispatch({ type: "SET_SHOW_MODAL", payload: ShowModal });
    };

    // always return a provider
    return (
        <GlobalContext.Provider
            value={{
                PickData: state.PickData,
                PackData: state.PackData,
                OrderNumber: state.OrderNumber,
                TicketNumber: state.TicketNumber,
                CustomerName: state.CustomerName,
                SelectedOrderLine: state.SelectedOrderLine,
                ShowModal: state.ShowModal,
                addToPackData,
                addToPickData,
                removeFromPackData,
                removeFromPickData,
                setPickOrder,
                setSelectedOrderLine,
                setShowModal,
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
};
