import { IsNotEmpty, IsString } from 'class-validator';

export default class ManipulateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
