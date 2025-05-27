import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript'

import { Author } from '../authors/authors.model'

@Table({ tableName: 'books' })
export class Book extends Model<Book> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number

  @Column({ type: DataType.STRING, allowNull: false })
  title: string

  @ForeignKey(() => Author)
  @Column({ type: DataType.INTEGER })
  authorId: number

  @BelongsTo(() => Author)
  author: Author
}
