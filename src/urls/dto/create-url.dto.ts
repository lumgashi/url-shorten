import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  Max,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUrlDto {
  @IsNotEmpty()
  @IsUrl()
  original_url: string;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(60000) // Minimum of 1 minute in milliseconds
  @Max(18000000) // Maximum of 5 houes in milliseconds
  ttl?: number;
}
