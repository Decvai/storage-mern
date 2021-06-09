import React from 'react';
import './navbar.scss';
import Logo from '../../assets/img/navbar-logo.svg';
import { NavLink, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser } from '../../reducers/userReducer';
import avatarLogo from '../../assets/img/avatar.svg';
import { API_URL } from '../../config';

const Navbar = () => {
	const isAuth = useSelector(state => state.user.isAuth);
	const currentUser = useSelector(state => state.user.currectUser);
	const dispatch = useDispatch();
	const avatar = currentUser.avatar ? `${API_URL + '\\' + currentUser.avatar}` : avatarLogo;
	console.log(avatar);

	return (
		<div className='navbar'>
			<div className='container'>
				<div className='navbar__top' to='/'>
					<img src={Logo} alt='navbar-logo' className='navbar__logo' />
					<div className='navbar__header'>MERN CLOUD</div>
				</div>

				{!isAuth && (
					<>
						<div className='navbar__login'>
							<NavLink to='/login'>Sign in</NavLink>
						</div>
						<div className='navbar__registration'>
							<NavLink to='/registration'>Sign up</NavLink>
						</div>
					</>
				)}

				{isAuth && (
					<>
						<NavLink to='/profile'>
							<img src={avatar} alt='avatar' className='navbar__avatar' />
						</NavLink>
						<div className='navbar__logout' onClick={() => dispatch(resetUser())}>
							<NavLink to='/login'>Sign out</NavLink>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default withRouter(Navbar);
