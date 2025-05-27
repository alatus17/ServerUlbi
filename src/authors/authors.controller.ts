import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'

import { AuthorsService } from './authors.service'

@Controller('authors')
export class AuthorsController {
  constructor(private authorsService: AuthorsService) {}

  @Post()
  create(@Body('name') name: string) {
    return this.authorsService.create(name)
  }

  @Get()
  findAll() {
    return this.authorsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorsService.findOne(+id)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorsService.remove(+id)
  }
}
