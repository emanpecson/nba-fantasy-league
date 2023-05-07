import FormData from 'form-data'
// import React, { useState } from 'react';

// function handleSubmit(event) {
// 	event.preventDefault();	// prevents default behavior when form submits: refreshing page
// 	const formData = new FormData(event.target);	// referring to Form that triggered the onSubmit event
  
// 	fetch('/api/users', {
// 		method: 'POST',
// 		// set body of post request to json of captured formData
// 		body: JSON.stringify({
// 			email: formData.get('email'),
// 			password: formData.get('password'),
// 		}),
// 		// tells us that the data is in json
// 		headers: {
// 			'Content-Type': 'application/json'
// 		}
// 	})
// 	// upon successful fetch for this Promise, we get a response obj
// 	.then(response => response.json())
// 	.then(data => { console.log('Success:', data); })
// 	.catch(error => { console.error('Error:', error); });
// }

function handleSubmit() {
	return;
}

/*
	"export defualt" typically used when other components need to reference this, 
	but we'd use it here b/c it's the first page
*/
export default function Signup() {
	// store states of password/verifyPassword so that we can handle this upon submit
	// const [email, setEmail] = useState('');
	// const [password, setPassword] = useState('');
	// const [verifyPassword, setVerifyPassword] = useState('');
	// const [isValid, setIsValid] = useState(false);

	// const handleEmailChange = (event) => {
	// 	setEmail(event.target.value);
	// 	setIsValid((prev) => event.target.value && password && verifyPassword && (password === verifyPassword));
	// }

	// const handlePasswordChange = (event) => {
	// 	setPassword(event.target.value);
	// 	setIsValid((prev) => email && event.target.value && verifyPassword && (event.target.value === verifyPassword));
	// }

	// const handleVerifyPasswordChange = (event) => {
	// 	setVerifyPassword(event.target.value);
	// 	setIsValid((prev) => email && password && event.target.value && (password === event.target.value));
	// }

	return (
		<div>
			<h1>Create an account!</h1>

			{/* <form onSubmit={handleSubmit}> */}
			<form>
				<label>E-mail:</label>
				<input 
					type="email" 
					name="email" 
					// value={email}
					// onChange={handleEmailChange}
					className="appearance-none border rounded w-full py-2 px-4 text-gray-700 bg-gray-200 focus:outline-none focus:shadow-outline"
					placeholder="Enter email" />

				<label>Password:</label>
				<input
					type="password"
					name="password"
					// value={password}
					// onChange={handlePasswordChange}
					className="appearance-none border rounded w-full py-2 px-4 text-gray-700 bg-gray-200 focus:outline-none focus:shadow-outline"
					placeholder="Enter password" />

				<label>Verify password:</label>
				<input
					type="password"
					name="verifyPassword"
					// value={verifyPassword}
					// onChange={handleVerifyPasswordChange}
					className="appearance-none border rounded w-full py-2 px-4 text-gray-700 bg-gray-200 focus:outline-none focus:shadow-outline"
					placeholder="Verify password" />

				<button
					type="submit"
					// disabled={!isValid}
					// we should change the class when disabled
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
					Create account
				</button>
			</form>
		</div>
	)
}

