import React, { useState } from 'react';
import { login } from '../../actions/user';
import Input from '../../utils/input/Input';
import './authorization.scss';
import { useDispatch } from 'react-redux';

const Login = ({ history }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();

	return (
		<div className='authorization'>
			<div className='authorization__header'>Sign in</div>
			<form onSubmit={e => e.preventDefault()}>
				<Input value={email} setValue={setEmail} type='text' placeholder='Email' />
				<Input value={password} setValue={setPassword} type='password' placeholder='Password' />
				<button className='authorization__btn' onClick={() => dispatch(login(email, password))}>
					Continue
				</button>
			</form>
		</div>
	);
};

export default Login;
