import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { ServeStaticModule } from '@nestjs/serve-static'
import { TypeOrmModule } from '@nestjs/typeorm'

import * as process from 'process'

import { AuthorsController } from './authors/authors.controller'
import { Author } from './authors/authors.model'
import { AuthorsService } from './authors/authors.service'
import { Book } from './books/books.model'
import { BooksModule } from './books/books.module'
import { FilesModule } from './files/files.module'
import { Post } from './posts/posts.model'
import { PostsModule } from './posts/posts.module'

import { AuthModule } from 'auth/auth.module'
import { AuthorsModule } from 'authors/authors.module'
import * as path from 'path'
import { Role } from 'roles/roles.model'
import { RolesModule } from 'roles/roles.module'
import { UserRoles } from 'roles/user-roles.model'
import { User } from 'users/users.model'
import { UsersModule } from 'users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles, Post, Book, Author],
      autoLoadModels: true,
      synchronize: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      synchronize: true,
      autoLoadEntities: true,
    }),
    BooksModule,
    UsersModule,
    RolesModule,
    AuthModule,
    PostsModule,
    FilesModule,
    AuthorsModule,
  ],
})
export class AppModule {}
