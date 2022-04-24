import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { API_BASE_URL } from '../constants';
import { AuthContext } from '../helpers';

interface UserForm {
	username: string;
	password: string;
	confirmPassword: string;
}

export const Registration = () => {
	const navigate = useNavigate();
	const { setAuthorization } = useContext(AuthContext);
	const initialValues: UserForm = {
		username: '',
		password: '',
		confirmPassword: ''
	};
	const validationSchema = Yup.object().shape({
		username: Yup.string().required(),
		password: Yup.string()
			.required()
			.matches(
				// eslint-disable-next-line
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
				'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
			),
		confirmPassword: Yup.string().oneOf(
			[Yup.ref('password'), null],
			'Passwords must match'
		)
	});

	const onSubmit = async (data: UserForm) => {
		try {
			const res = await axios.post(`${API_BASE_URL}/auth/register`, data);
			let authorization = { isAuthorized: true, user: res.data.user };
			localStorage.setItem('accessToken', res.data.accessToken);
			localStorage.setItem('authorization', JSON.stringify(authorization));
			setAuthorization(authorization);
			navigate('/');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className='container center_vertical spacer_vertical_small'>
			<div className='form_title'>Register</div>
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
						<div className='flex-fill'>
							<label className='form_label'>Confirm Password</label>
							<ErrorMessage
								name='confirmPassword'
								component='h3'
								className='form_error'
							/>
							<Field
								name='confirmPassword'
								placeholder='Confirm Password*'
								className='form_field'
								type='password'
							/>
						</div>
						<div className='form_submit_container center_vertical'>
							<button className='btn btn_primary' type='submit'>
								Register
							</button>
						</div>
					</Form>
				</Formik>
			</div>
		</div>
	);
};
