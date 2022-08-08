import React, { useReducer } from "react";
import "./App.css";
import Axios from "axios";

let initState = {
	registerUsername: "",
	registerPassword: "",
	loginUsername: "",
	loginPassword: "",
	data: null,
};

function reduce(state, { type, payload }) {
	switch (type) {
		case "registerUsername":
			return { ...state, registerUsername: payload };
		case "registerPassword":
			return { ...state, registerPassword: payload };
		case "loginUsername":
			return { ...state, loginUsername: payload };
		case "loginPassword":
			return { ...state, loginPassword: payload };
		case "data":
			return { ...state, data: payload };
		default:
			return initState;
	}
}

function App() {
	const [state, dispatch] = useReducer(reduce, initState);
	const {
		registerUsername,
		registerPassword,
		loginUsername,
		loginPassword,
		data,
	} = state;

	const register = () => {
		Axios({
			method: "POST",
			data: {
				username: registerUsername,
				password: registerPassword,
			},
			withCredentials: true,
			url: "http://localhost:4000/register",
		}).then((res) => console.log(res));
	};
	const login = () => {
		Axios({
			method: "POST",
			data: {
				username: loginUsername,
				password: loginPassword,
			},
			withCredentials: true,
			url: "http://localhost:4000/login",
		}).then((res) => console.log(res));
	};
	const getUser = () => {
		Axios({
			method: "GET",
			withCredentials: true,
			url: "http://localhost:4000/user",
		}).then((res) => {
			dispatch({ type: "data", payload: res.data });
			console.log(res.data);
		});
	};
	return (
		<div className="App">
			<div>
				<h1>Register</h1>
				<input
					placeholder="username"
					onChange={(e) =>
						dispatch({ type: "registerUsername", payload: e.target.value })
					}
				/>
				<input
					placeholder="password"
					onChange={(e) =>
						dispatch({ type: "registerPassword", payload: e.target.value })
					}
				/>
				<button onClick={register}>Submit</button>
			</div>

			<div>
				<h1>Login</h1>
				<input
					placeholder="username"
					onChange={(e) =>
						dispatch({ type: "loginUsername", payload: e.target.value })
					}
				/>
				<input
					placeholder="password"
					onChange={(e) =>
						dispatch({ type: "loginPassword", payload: e.target.value })
					}
				/>
				<button onClick={login}>Submit</button>
			</div>

			<div>
				<h1>Get User</h1>
				<button onClick={getUser}>Submit</button>
				{data ? <h1>Welcome Back {data.username}</h1> : null}
			</div>
		</div>
	);
}

export default App;
