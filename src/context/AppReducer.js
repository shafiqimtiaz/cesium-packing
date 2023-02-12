const reducer = (state, action) => {

    switch (action.type) {
        case "ADD_ITEM_TO_PACKED":
            return {
                ...state,
                PackData: action.payload,
            };
        case "ADD_ITEM_TO_PICKED":
            return {
                ...state,
                PickData: action.payload,
            };
        case "REMOVE_ITEM_FROM_PACKED":
            return {
                ...state,
                PackData: state.PackData.filter(
                    (selectedOrderLine) => selectedOrderLine !== action.payload
                ),
            };
        case "REMOVE_ITEM_FROM_PICKED":
            return {
                ...state,
                PickData: state.PickData.filter(
                    (selectedOrderLine) => selectedOrderLine !== action.payload
                ),
            };
        case "SET_PICK_ORDER":
            return {
                ...state,
                TicketNumber: action.payload.TicketNumber,
                OrderNumber: action.payload.OrderNumber,
                CustomerName: action.payload.CustomerName
            };
        case "SET_SELECTED_ORDER_LINE":
            return {
                ...state,
                SelectedOrderLine: action.payload,
            };
        case "SET_SHOW_MODAL":
            return {
                ...state,
                ShowModal: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
