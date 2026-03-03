import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class SlugValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value !== 'string') {
      throw new BadRequestException('O slug deve ser uma string');
    }

    if (value.includes(' ')) {
      throw new BadRequestException('Slugs não podem conter espaços. Use hifens (-)');
    }

    return value.toLowerCase();
  }
}