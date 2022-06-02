import { Post } from './Post';

export interface User {
	id: number;
	username: string;
	createdAt: string;
	updatedAt: string;
	posts: Post[];
}
