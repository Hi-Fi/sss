import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { registerUser as registerUserAction } from "../actions/user";

const defaultValues = {
	username: "",
	password: "",
	email: "",
};

export const RegisterUser = () => {
	const {
		handleSubmit,
		control,
		reset,
		submitting,
		formState: { errors },
	} = useForm(defaultValues);
	const registrationErrors = useSelector(
		(state) => state.user.userRegistrationErrors,
	);
	const dispatch = useDispatch();
	const registerUser = (data) => dispatch(registerUserAction(data));

	return (
		<div className="user">
			<form onSubmit={handleSubmit(registerUser)}>
				<div>
					<div>
						<Controller
							name="username"
							render={({ field }) => (
								<TextField label="Username" variant="standard" {...field} />
							)}
							control={control}
							rules={{ required: true }}
							defaultValue=""
						/>
						{errors.username && <div>Username is required</div>}
					</div>
					<div>
						<Controller
							name="password"
							render={({ field }) => (
								<TextField
									label="Password"
									type="password"
									variant="standard"
									{...field}
								/>
							)}
							control={control}
							rules={{ required: true }}
							defaultValue=""
						/>
						{errors.password && <div>Password is required</div>}
					</div>
					<div>
						<Controller
							name="email"
							render={({ field }) => (
								<TextField label="Email" variant="standard" {...field} />
							)}
							control={control}
							rules={{ required: true }}
							defaultValue=""
						/>
						{errors.email && <div>Email is required</div>}
					</div>

					<div>{registrationErrors}</div>

					<Button type="submit" disabled={submitting}>
						Register
					</Button>
					<Button
						type="button"
						disabled={submitting}
						onClick={() => reset(defaultValues)}
					>
						Reset
					</Button>
				</div>
			</form>
		</div>
	);
};

RegisterUser.propTypes = {
	registerUser: PropTypes.func,
	registrationErrors: PropTypes.object,
};
