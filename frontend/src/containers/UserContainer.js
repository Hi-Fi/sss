import { connect } from "react-redux";
import User from "../components/User.js";
import { loginUser } from "../actions/user";

const mapStateToProps = (state) => {
	return {
		user: state.user,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loginUser: (data) => {
			dispatch(loginUser(data.username, data.password));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
