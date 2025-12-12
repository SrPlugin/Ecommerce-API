import { IsString, IsNotEmpty, MinLength, IsNumber, Min, IsArray, ValidateNested, ArrayMinSize } from "class-validator";
import { Type } from "class-transformer";
import { CreateOrderItemDto } from "./create-order-item.dto";

export class CreateOrderDto {
    

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    contact_email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    contact_name: string;
    
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    shipping_address: string;
    
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => CreateOrderItemDto)
    items: CreateOrderItemDto[];
    
    @IsNumber()
    @IsNotEmpty()
    customer_identifier: number;
    
}
