import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Book } from './book.entity'
import { CreateBookDto } from './create-book.dto'

import { Repository } from 'typeorm'

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>
  ) {}

  create(dto: CreateBookDto): Promise<Book> {
    const book = this.booksRepository.create(dto)
    return this.booksRepository.save(book)
  }

  findAll(): Promise<Book[]> {
    return this.booksRepository.find()
  }

  findOne(id: number): Promise<Book> {
    return this.booksRepository.findOneBy({ id })
  }

  async remove(id: number): Promise<void> {
    await this.booksRepository.delete(id)
    return undefined
  }
}
