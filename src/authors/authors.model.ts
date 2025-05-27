import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'

import { Book } from 'books/books.model'

@Table({ tableName: 'authors' })
export class Author extends Model<Author> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number

  @Column({ type: DataType.STRING, allowNull: false })
  name: string

  @HasMany(() => Book)
  books: Book[]
}

