import { Optional } from 'sequelize';
import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	HasMany,
	Model,
	Table
} from 'sequelize-typescript';
import { Comments } from './Comments';
import { Users } from './Users';

interface PostAttributes {
	id: number;
	userId: number;
	title: string;
	description: string;
}

interface PostCreationAttributes extends Optional<PostAttributes, 'id'> {}

@Table
export class Posts extends Model<PostAttributes, PostCreationAttributes> {
	@Column({ type: DataType.STRING, allowNull: false })
	title!: string;

	@Column({ type: DataType.TEXT, allowNull: false })
	description!: string;

	@ForeignKey(() => Users)
	@Column
	userId!: number;

	@BelongsTo(() => Users)
	user!: Users;

	@HasMany(() => Comments, { onDelete: 'cascade' })
	comments?: Comments[];
}
