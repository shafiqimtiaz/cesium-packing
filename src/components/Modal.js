import React from 'react';

// TODO: pack qty based on input value or remaining qty

const Modal = (props) => {
    const { showModal, showModalPromt, pack } = props;
    return (
        <div
            className={`modal fade ${showModal ? 'show' : ''}`}
            tabIndex="-1"
            role="dialog"
            style={{ display: showModal ? 'block' : 'none' }}
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Select number of <b>{props.data !== undefined ? props.data.sku : ""}</b> to pack</h5>
                    </div>
                    <div className="modal-body">
                        <div className="input-group">
                            <span className="input-group-text">Item Count</span>
                            <input type="text" className="form-control" id="itemCount" defaultValue={props.data !== undefined ? props.data.remainingQty : ""} />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                            onClick={() => showModalPromt(false)}
                        >
                            Close
                        </button>
                        <button type="button" className="btn btn-primary" onClick={() => pack(props.data)}>
                            Pack
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;