import { Optional } from 'sequelize';
import {
	BelongsTo,
	Column,
	ForeignKey,
	Model,
	Table
} from 'sequelize-typescript';
import { Posts } from './Posts';
import { Users } from './Users';

interface LikeAttributes {
	id: number;
	postId: number;
	userId: number;
}

interface LikeCreationAttributes extends Optional<LikeAttributes, 'id'> {}

@Table
export class Likes extends Model<LikeAttributes, LikeCreationAttributes> {
	@ForeignKey(() => Posts)
	@Column
	postId!: number;

	@BelongsTo(() => Posts)
	post!: Posts;

	@ForeignKey(() => Users)
	@Column
	userId!: number;

	@BelongsTo(() => Users)
	user!: Users;
}
