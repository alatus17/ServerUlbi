import { UsersController } from './users.controller';
import {User} from "./users.model";
import {SequelizeModule} from "@nestjs/sequelize";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {RolesModule} from "../roles/roles.module";
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles]),
    RolesModule
  ],
  exports: [UsersService]
})
export class UsersModule {}
