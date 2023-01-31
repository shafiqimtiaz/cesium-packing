import React from "react";

export const Menu = () => {
    return (
        <div className="container">
            <p>Please scan or enter Carton / Order number to proceed</p>
            <form>
                <div class="row g-3 align-items-center">
                    <div class="col-auto">
                        <label for="carton_number" className="form-label">Carton #</label>
                    </div>
                    <div class="col-auto">
                        <input className="form-control" type="text" placeholder="Carton number" id="carton_number" />
                    </div>
                </div>
                <br />
                <div class="row g-3 align-items-center">
                    <div class="col-auto">
                        <label for="order_number" className="form-label">Order #</label>
                    </div>
                    <div class="col-auto">
                        <input className="form-control" type="text" placeholder="Order number" id="order_number" />
                    </div>
                </div>
                <br />
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};