import { Button } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import UserContainer from "../containers/UserContainer";
import { RegisterUser } from "./RegisterUser";
import { useDispatch, useSelector } from "react-redux";
import {
	registerForm as registerFormAction,
	loginForm as loginFormAction,
	logoutUser as logoutUserAction,
} from "../actions/user.js";

export const Header = () => {
	const user = useSelector((state) => state.user.user);
	const dispatch = useDispatch();
	const loginForm = (content) => dispatch(loginFormAction(content));
	const registerForm = (content) => dispatch(registerFormAction(content));
	const logoutUser = () => dispatch(logoutUserAction());

	return (
		<div className="header">
			{user && (
				<Button className="button" onClick={() => logoutUser()}>
					Logout
				</Button>
			)}
			{!user && (
				<div>
					<Button
						className="button"
						onClick={() => loginForm(<UserContainer />)}
					>
						Login
					</Button>
					<Button
						className="button"
						onClick={() => registerForm(<RegisterUser />)}
					>
						Register
					</Button>
				</div>
			)}
		</div>
	);
};

Header.propTypes = {
	user: PropTypes.string,
	loginForm: PropTypes.func,
	registerForm: PropTypes.func,
	logoutUser: PropTypes.func,
};
