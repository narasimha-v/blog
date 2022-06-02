import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { API_BASE_URL } from '../constants';
import { User } from '../types';
import { capitalize, getFormattedDate } from '../utils';

export const Profile = () => {
	const { id } = useParams();
	const [user, setUser] = useState<User>();

	useEffect(() => {
		axios
			.get<{ user: User }>(`${API_BASE_URL}/auth/userInfo/${id}`)
			.then((res) => setUser(res.data.user));
	}, [id]);

	if (!user) {
		return (
			<div className='center_horizontal'>
				<div className='loader' />
			</div>
		);
	}

	return (
		<div className='center_vertical'>
			<h1>{capitalize(user.username)}</h1>

			{user.posts.map((p) => (
				<div className='container'>
					<div className='card'>
						<h2>
							{p.title}
							<div>{getFormattedDate(p.createdAt)}</div>
						</h2>
						<p>{p.description.slice(0, 200)}........</p>
						<div className='card_btn_container space_between'>
							<div>
								<Link className='btn btn_primary' to={`/post/${p.id}`}>
									Read More
								</Link>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};
