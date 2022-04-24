import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { API_BASE_URL } from '../constants';
import { AuthContext } from '../helpers';

interface PostForm {
	userId: number;
	title: string;
	description: string;
}

export const CreatePost = () => {
	const navigate = useNavigate();
	const {
		authorization: { isAuthorized, user }
	} = useContext(AuthContext);

	useEffect(() => {
		if (!isAuthorized || !user) {
			return navigate('/login');
		}
	}, [isAuthorized, user, navigate]);

	if (!isAuthorized || !user) {
		return null;
	}

	const initialValues: PostForm = {
		userId: user.id,
		title: '',
		description: ''
	};
	const validationSchema = Yup.object().shape({
		title: Yup.string().required(),
		description: Yup.string().required()
	});

	const onSubmit = async (data: PostForm) => {
		let accessToken = localStorage.getItem('accessToken');
		if (!accessToken) return;
		await axios.post(`${API_BASE_URL}/posts`, data, {
			headers: { accessToken }
		});
		navigate('/');
	};

	return (
		<div className='container center_vertical spacer_vertical_small'>
			<div className='form_title'>Create New Post</div>
			<div className='card_large'>
				<Formik
					initialValues={initialValues}
					onSubmit={onSubmit}
					validationSchema={validationSchema}>
					<Form className='spacer_vertical'>
						<div>
							<label className='form_label'>Title</label>
							<ErrorMessage
								name='title'
								component='h3'
								className='form_error'
							/>
							<Field
								name='title'
								placeholder='Title*'
								className='form_field form_field_large'
							/>
						</div>
						<div>
							<label className='form_label'>Description</label>
							<ErrorMessage
								name='description'
								component='h3'
								className='form_error'
							/>
							<Field
								name='description'
								placeholder='Description*'
								className='form_field form_field_large'
								component='textarea'
								rows='12'
							/>
						</div>
						<div className='form_submit_container spacer_horizontal'>
							<div>
								<Link to='/' className='btn btn_secondary'>
									Cancel
								</Link>
							</div>
							<div>
								<button className='btn btn_primary' type='submit'>
									Create
								</button>
							</div>
						</div>
					</Form>
				</Formik>
			</div>
		</div>
	);
};
