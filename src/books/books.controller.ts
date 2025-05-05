import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'

import { Book } from './book.entity'
import { BooksService } from './books.service'
import { CreateBookDto } from './create-book.dto'

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() dto: CreateBookDto): Promise<Book> {
    return this.booksService.create(dto)
  }

  @Get()
  findAll(): Promise<Book[]> {
    return this.booksService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Book> {
    return this.booksService.findOne(+id)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.booksService.remove(+id)
  }
}
