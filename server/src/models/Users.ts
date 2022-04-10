import { Optional } from 'sequelize';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Comments } from './Comments';
import { Posts } from './Posts';

interface UserAttributes {
	id: number;
	username: string;
	password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

@Table
export class Users extends Model<UserAttributes, UserCreationAttributes> {
	@Column({ type: DataType.STRING, allowNull: false, unique: true })
	username!: string;

	@Column({ type: DataType.STRING, allowNull: false })
	password!: string;

	@HasMany(() => Posts, { onDelete: 'cascade' })
	posts?: Posts[];

	@HasMany(() => Comments, { onDelete: 'cascade' })
	comments?: Comments[];
}
