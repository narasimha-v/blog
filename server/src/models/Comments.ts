import { Optional } from 'sequelize';
import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table
} from 'sequelize-typescript';
import { Posts } from './Posts';
import { Users } from './Users';

interface CommentAttributes {
	id: number;
	postId: number;
	userId: number;
	comment: string;
}

interface CommentCreationAttributes extends Optional<CommentAttributes, 'id'> {}

@Table
export class Comments extends Model<
	CommentAttributes,
	CommentCreationAttributes
> {
	@Column({ type: DataType.STRING, allowNull: false })
	comment!: string;

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
