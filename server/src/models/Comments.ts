import { Optional } from 'sequelize';
import {
	Table,
	Model,
	Column,
	DataType,
	ForeignKey,
	BelongsTo
} from 'sequelize-typescript';
import { Posts } from './Posts';

interface CommentAttributes {
	id: number;
	postId: number;
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
}
