import { Module } from '@nestjs/common';
import UseRepositories from '../use-repositories';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';

@Module({
  imports: [UseRepositories([Category])],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
