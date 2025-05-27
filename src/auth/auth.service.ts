import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import * as bcrypt from 'bcryptjs'

import { CreateUserDto } from 'users/dto/create-user.dto'
import { User } from 'users/users.model'
import { UsersService } from 'users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto)
    return this.generateToken(user)
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUsersByEmail(userDto.email)
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email существует',
        HttpStatus.BAD_REQUEST
      )
    }
    const hashPassword = await bcrypt.hash(userDto.password, 10)
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    })
    return this.generateToken(user)
  }

  private async generateToken(user: User) {
    const payload = {
      email: user.email,
      id: user.id,
      roles: user.roles.map((role) => role.value),
    }

    return {
      token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        roles: user.roles.map((role) => role.value),
      },
    }
  }

  private async validateUser(userDto: CreateUserDto) {
    console.log('[AUTH] Login attempt for email:', userDto.email)

    const user = await this.userService.getUsersByEmail(userDto.email)

    if (!user) {
      console.log('[AUTH] User not found')
      throw new UnauthorizedException('Пользователь с таким email не найден')
    }

    if (user.banned) {
      console.log('[AUTH] User is banned')
      throw new UnauthorizedException('Пользователь заблокирован')
    }

    console.log('[AUTH] Input password:', `"${userDto.password}"`)
    console.log('[AUTH] DB password hash:', user.password)

    const passwordEquals = await bcrypt.compare(userDto.password, user.password)
    console.log('[AUTH] Password comparison result:', passwordEquals)

    if (!passwordEquals) {
      const manualHash = await bcrypt.hash(userDto.password, 10)
      console.log('[AUTH] New hash of input password:', manualHash)

      throw new UnauthorizedException('Неверный пароль')
    }

    console.log('[AUTH] Authentication successful')
    return user
  }
}
