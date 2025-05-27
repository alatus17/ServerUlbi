import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { Book } from './book.entity'
import { BooksService } from './books.service'
import { CreateBookDto } from './create-book.dto'

@ApiTags('Книги')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiOperation({ summary: 'Добавить книгу' })
  @Post()
  create(@Body() dto: CreateBookDto): Promise<Book> {
    return this.booksService.create(dto)
  }

  @ApiOperation({ summary: 'Получить список книг' })
  @Get()
  findAll(): Promise<Book[]> {
    return this.booksService.findAll()
  }

  @ApiOperation({ summary: 'Показать выбранную книгу' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Book> {
    return this.booksService.findOne(+id)
  }

  @ApiOperation({ summary: 'Удалить книгу' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.booksService.remove(+id)
  }
}
