import { IsNotEmpty, IsNumber, IsOptional, IsString, Min, MinLength } from "class-validator";

export class CreateProductDto {


  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  price: number;

  @IsString()
  @IsOptional()
  slug: string;

  @IsNumber()
  @IsNotEmpty()
  stock: number;
}