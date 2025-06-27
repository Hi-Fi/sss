import React, { Component } from "react";
import { RegisterUser } from "../components/RegisterUser";

class RegisterPage extends Component {
	render() {
		return (
			<div className="container">
				<RegisterUser />
			</div>
		);
	}
}

export default RegisterPage;
