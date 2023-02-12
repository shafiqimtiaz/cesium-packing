import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { useNavigate } from "react-router-dom"
import Utils from "./Utils";

export const Action = ({data}) => {

	const { unPack } = Utils();

	const {
		setShowModal,
	} = useContext(GlobalContext);

	const navigate = useNavigate();
	const navigateToMenu = () => {
		navigate('/');
	};

	return (
		<div className="container text-center mb-3">
			<button className="btn btn-primary mr-2" onClick={navigateToMenu}>Back</button>
			<button className="btn btn-warning mx-2" onClick={() => setShowModal(true)}>Pack</button>
			<button className="btn btn-danger mr-2" onClick={() => unPack(data)}>Unpack</button>
			<button className="btn btn-success mx-2" >Submit</button>
		</div>
	);
};