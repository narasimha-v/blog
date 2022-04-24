import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { API_BASE_URL } from '../constants';
import { AuthContext } from '../helpers';

interface UserForm {
	username: string;
	password: string;
}

export const Login = () => {
	const navigate = useNavigate();
	const { setAuthorization } = useContext(AuthContext);
	const [loginError, showLoginError] = useState(false);
	const initialValues: UserForm = { username: '', password: '' };
	const validationSchema = Yup.object().shape({
		username: Yup.string().required(),
		password: Yup.string().required()
	});

	const onSubmit = async (data: UserForm) => {
		try {
			const res = await axios.post(`${API_BASE_URL}/auth/login`, data);
			let authorization = { isAuthorized: true, user: res.data.user };
			localStorage.setItem('accessToken', res.data.accessToken);
			localStorage.setItem('authorization', JSON.stringify(authorization));
			setAuthorization(authorization);
			navigate('/');
		} catch (error) {
			showLoginError(true);
		}
	};

	return (
		<div className='container center_vertical spacer_vertical_small'>
			<div className='form_title'>Login</div>
			<div className='card'>
				<Formik
					initialValues={initialValues}
					onSubmit={onSubmit}
					validationSchema={validationSchema}>
					<Form className='spacer_vertical'>
						<div className='flex-fill'>
							<label className='form_label'>Username</label>
							<ErrorMessage
								name='username'
								component='h3'
								className='form_error'
							/>
							<Field
								name='username'
								placeholder='Username*'
								className='form_field'
							/>
						</div>
						<div className='flex-fill'>
							<label className='form_label'>Password</label>
							<ErrorMessage
								name='password'
								component='h3'
								className='form_error'
							/>
							<Field
								name='password'
								placeholder='Password*'
								className='form_field'
								type='password'
							/>
						</div>
						<div className='form_submit_container center_vertical'>
							{loginError && (
								<h3 className='form_error'>Please Check your credentials!</h3>
							)}
							<button className='btn btn_primary' type='submit'>
								Login
							</button>
						</div>
					</Form>
				</Formik>
			</div>
		</div>
	);
};
