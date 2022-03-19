import { Optional } from 'sequelize';
import { Table, Model, Column, DataType } from 'sequelize-typescript';

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
}
