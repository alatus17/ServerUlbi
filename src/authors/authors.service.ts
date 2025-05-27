import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

import { Book } from '../books/books.model'
import { Author } from './authors.model'

@Injectable()
export class AuthorsService {
  constructor(@InjectModel(Author) private authorRepository: typeof Author) {
  }

  async create(name: string): Promise<Author> {
    const existing = await this.authorRepository.findOne({ where: { name } })
    if (existing) {
      throw new HttpException('Автор уже существует', HttpStatus.CONFLICT)
    }
    return this.authorRepository.create({ name })
  }

  async findAll(): Promise<Author[]> {
    return this.authorRepository.findAll({ include: [Book] })
  }

  async remove(id: number): Promise<void> {
    const author = await this.authorRepository.findByPk(id)
    if (!author) {
      throw new HttpException('Автор не найден', HttpStatus.NOT_FOUND)
    }
    await author.destroy()
  }

  async findOne(id: number): Promise<Author> {
    const author = await this.authorRepository.findByPk(id, {
      include: { all: true },
    })
    if (!author) {
      throw new HttpException('Автор не найден', HttpStatus.NOT_FOUND)
    }
    return author
  }
}