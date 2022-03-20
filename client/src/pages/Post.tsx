import { Link, useParams } from 'react-router-dom';
import { Comments, IndividualPost } from '../components';

export const Post = () => {
	const { id } = useParams();

	return (
		<div className='container spacer_vertical'>
			<div className='post_container spacer_horizontal'>
				<div className='post_container_left card_large'>
					<IndividualPost id={id} />
				</div>
				<div className='post_container_right card_large spacer_vertical'>
					<Comments id={id} />
				</div>
			</div>
			<div className='post_back'>
				<Link className='btn btn_primary' to='/'>
					Back
				</Link>
			</div>
		</div>
	);
};
