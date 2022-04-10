import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { API_BASE_URL } from '../constants';

interface PostForm {
	username: string;
	title: string;
	description: string;
}

export const CreatePost = () => {
	const navigate = useNavigate();
	const initialValues: PostForm = { username: '', title: '', description: '' };
	const validationSchema = Yup.object().shape({
		username: Yup.string().required().min(2).max(16),
		title: Yup.string().required(),
		description: Yup.string().required()
	});

	const onSubmit = async (data: PostForm) => {
		await axios.post(`${API_BASE_URL}/posts`, data);
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
						<div>
							<label className='form_label'>Title</label>
							<ErrorMessage
								name='title'
								component='h3'
								className='form_error'
							/>
							<Field name='title' placeholder='Title*' className='form_field' />
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
								className='form_field'
								component='textarea'
								rows='10'
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
