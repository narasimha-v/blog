import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';
import { capitalize } from '../utils';

export const UsernameDisplay: React.FC<{ user: User }> = ({ user }) => {
	const navigate = useNavigate();

	return (
		<div className='username' onClick={() => navigate(`/profile/${user.id}`)}>
			{capitalize(user.username)}
		</div>
	);
};
