import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Book } from '../books/books.model'
import { Author } from '../authors/authors.model'
import { CreateBookDto } from './create-book.dto'

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book)
    private bookRepository: typeof Book,

    @InjectModel(Author)
    private authorRepository: typeof Author,
  ) {}

  async create(dto: CreateBookDto): Promise<Book> {
    let author = await this.authorRepository.findOne({ where: { name: dto.authorName } })
    if (!author) {
      author = await this.authorRepository.create({ name: dto.authorName })
    }

    const existing = await this.bookRepository.findOne({
      where: { title: dto.title, authorId: author.id },
    })
    if (existing) {
      throw new HttpException('Книга уже существует', HttpStatus.CONFLICT)
    }

    return this.bookRepository.create({
      title: dto.title,
      authorId: author.id,
    })
  }

  findAll(): Promise<Book[]> {
    return this.bookRepository.findAll({ include: [Author] })
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.bookRepository.findByPk(id, { include: [Author] })
    if (!book) {
      throw new HttpException('Книга не найдена', HttpStatus.NOT_FOUND)
    }
    return book
  }

  async remove(id: number): Promise<void> {
    const book = await this.bookRepository.findByPk(id)
    if (!book) {
      throw new HttpException('Книга не найдена', HttpStatus.NOT_FOUND)
    }
    await book.destroy()
  }
}

