import React, { useContext } from 'react';
import { GlobalContext } from "../context/GlobalState";
import Utils from "../controllers/Utils";

// TODO: pack qty based on input value or remaining qty

const Modal = ({data}) => {

    const {
        ShowModal,
        setShowModal,
    } = useContext(GlobalContext);

    const { pack } = Utils();

    return (
        <div
            className={`modal fade ${ShowModal ? 'show' : ''}`}
            tabIndex="-1"
            role="dialog"
            style={{ display: ShowModal ? 'block' : 'none' }}
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Select number of <b>{data !== undefined ? data.sku : ""}</b> to pack</h5>
                    </div>
                    <div className="modal-body">
                        <div className="input-group">
                            <span className="input-group-text">Item Count</span>
                            <input type="text" className="form-control" id="itemCount" defaultValue={data !== undefined ? data.remainingQty : ""} />
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
                        <button type="button" className="btn btn-primary" onClick={() => pack(data)}>
                            Pack
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;