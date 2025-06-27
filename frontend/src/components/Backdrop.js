import React from "react";
import { useSelector } from "react-redux";
import { createPortal } from "react-dom";

export const Backdrop = () => {
	const modal = useSelector((state) => state.modal);
	const backdropRoot = document.getElementById("backdrop");
	return modal && createPortal(<div className="backdrop" />, backdropRoot);
};
