import { CategoryDto } from '@accountingapp/shared';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { LoggedInUser } from '../auth/user.decorator';
import { SecureUser } from '../users/entities/secure-user';
import { CategoryService } from './category.service';
import ManipulateCategoryDto from './dtos/manipulate-category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(AuthenticatedGuard)
  @Get()
  getCategoriesByUser(
    @LoggedInUser() user: SecureUser,
  ): Promise<CategoryDto[]> {
    return this.categoryService.getByUser(user.username);
  }

  @UseGuards(AuthenticatedGuard)
  @Post()
  createCategory(
    @LoggedInUser() user: SecureUser,
    @Body() category: ManipulateCategoryDto,
  ): Promise<CategoryDto> {
    return this.categoryService.create(category.name, user.username);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  deleteCategory(@Param('id') id: string, @LoggedInUser() user: SecureUser) {
    return this.categoryService.deleteById(id, user.username);
  }

  @UseGuards(AuthenticatedGuard)
  @Put(':id')
  updateCategory(
    @Param('id') id: string,
    @Body() category: ManipulateCategoryDto,
    @LoggedInUser() user: SecureUser,
  ): Promise<CategoryDto> {
    return this.categoryService.updateById(id, category.name, user.username);
  }

  @UseGuards(AuthenticatedGuard)
  @Get(':id')
  getCategoryById(
    @Param('id') id: string,
    @LoggedInUser() user: SecureUser,
  ): Promise<CategoryDto> {
    return this.categoryService.getById(id, user.username);
  }
}
