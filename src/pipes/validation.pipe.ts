import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common'

import { plainToClass, plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { ValidationException } from 'exceptions/validation.exception'

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.shouldValidate(metatype)) {
      return value;
    }

    const obj = plainToInstance(metatype, value);

    // Добавленная проверка
    if (obj === null || typeof obj !== 'object') {
      throw new BadRequestException('Invalid data format');
    }

    const errors = await validate(obj);

    if (errors.length > 0) {
      throw new BadRequestException(
        errors.map(e => ({
          field: e.property,
          errors: e.constraints
        }))
      );
    }

    return obj;
  }

  private shouldValidate(metatype: any): boolean {
    const excluded = [String, Boolean, Number, Array, Object];
    return !excluded.includes(metatype);
  }
}
