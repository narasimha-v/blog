import { Like } from './Like';
import { User } from './User';

export interface Post {
	id: number;
	userId: number;
	title: string;
	description: string;
	user: User;
	createdAt: string;
	updatedAt: string;
	likes: Like[];
}
