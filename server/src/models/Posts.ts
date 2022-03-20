import { Optional } from 'sequelize';
import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { Comments } from './Comments';

interface PostAttributes {
	id: number;
	title: string;
	description: string;
	username: string;
}

interface PostCreationAttributes extends Optional<PostAttributes, 'id'> {}

@Table
export class Posts extends Model<PostAttributes, PostCreationAttributes> {
	@Column({ type: DataType.STRING, allowNull: false })
	title!: string;

	@Column({ type: DataType.TEXT, allowNull: false })
	description!: string;

	@Column({ type: DataType.STRING, allowNull: false })
	username!: string;

	@HasMany(() => Comments, { onDelete: 'cascade' })
	comments?: Comments[];
}
