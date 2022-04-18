import { Post } from './Post';
import { User } from './User';

export interface Comment {
	id: number;
	postId: number;
	userId: number;
	comment: string;
	post: Post;
	user: User;
	createdAt: string;
	updatedAt: string;
}
