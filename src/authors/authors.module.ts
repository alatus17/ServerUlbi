import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { AuthorsController } from './authors.controller'
import { Author } from './authors.model'
import { AuthorsService } from './authors.service'

@Module({
  imports: [SequelizeModule.forFeature([Author])],
  providers: [AuthorsService],
  controllers: [AuthorsController],
  exports: [AuthorsService],
})
export class AuthorsModule {}
