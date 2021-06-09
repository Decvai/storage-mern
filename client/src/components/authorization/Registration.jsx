import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, registration } from '../../actions/user';
import Input from '../../utils/input/Input';
import './authorization.scss';

const Registration = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();

	return (
		<div className='authorization'>
			<div className='authorization__header'>Sign up</div>
			<form onSubmit={e => e.preventDefault()}>
				<Input value={email} setValue={setEmail} type='text' placeholder='Email' />
				<Input value={password} setValue={setPassword} type='password' placeholder='Password' />
				<button
					className='authorization__btn'
					onClick={async () => {
						await registration(email, password);
						dispatch(login(email, password));
					}}
				>
					Continue
				</button>
			</form>
		</div>
	);
};

export default Registration;
