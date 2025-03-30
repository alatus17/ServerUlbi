import { ApiProperty } from '@nestjs/swagger'

import { UserRoles } from './user-roles.model'

import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript'
import { User } from 'users/users.model'

interface RoleCreationAttrs {
  value: string
  description: string
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @ApiProperty({ example: 'ADMIN', description: 'Значение роли пользователя' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: string

  @ApiProperty({ example: 'Администратор', description: 'Описание роли' })
  @Column({ type: DataType.STRING, defaultValue: false })
  description: string

  @BelongsToMany(() => User, () => UserRoles)
  users: User[]
}
