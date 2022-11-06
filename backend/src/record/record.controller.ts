import {
  PaginatedResultDto,
  RecordDto,
  SearchQueryDto,
} from '@accountingapp/shared';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { LoggedInUser } from '../auth/user.decorator';
import { SecureUser } from '../users/entities/secure-user';
import CheckExternalReferencesDto from './dtos/check-external-references.dto';
import CreateManyRecordsDto from './dtos/create-many-records.dto';
import CreateRecordDto from './dtos/create-record.dto';
import UpdateRecordDto from './dtos/update-record.dto';
import { RecordService } from './record.service';

@UseGuards(AuthenticatedGuard)
@Controller('records')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Get('/category/:categoryId')
  async getByCategory(
    @Param('categoryId') categoryId: string,
    @LoggedInUser() user: SecureUser,
  ) {
    return this.recordService.getByCategory(categoryId, user.username);
  }

  @Post()
  async createNewRecord(
    @LoggedInUser() user: SecureUser,
    @Body() record: CreateRecordDto,
  ) {
    const username = user.username;
    const { description, value, walletId, timestamp, categoryId } = record;

    return this.recordService.createRecord(
      description,
      value,
      timestamp,
      walletId,
      categoryId,
      username,
    );
  }

  @Get()
  async getByUser(
    @LoggedInUser() user: SecureUser,
    @Query() query: SearchQueryDto,
  ): Promise<PaginatedResultDto> {
    const { username } = user;
    const {
      sortBy,
      sortDirection,
      page,
      itemsPerPage,
      categoryId,
      walletId,
      description,
      timestampFrom,
      timestampTo,
    } = query;

    const records = await this.recordService.getByQuery(
      {
        itemsPerPage,
        page,
        sortBy: sortBy,
        sortDirection: sortDirection,
        categoryId,
        walletId,
        description,
        timestampFrom,
        timestampTo,
      },
      username,
    );

    const recordCount = await this.recordService.getRecordsCountByQuery(
      { categoryId, description, walletId },
      username,
    );

    return {
      data: records,
      page,
      dataCount: records.length,
      totalCount: recordCount,
    };
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string, @LoggedInUser() user: SecureUser) {
    const { username } = user;

    return this.recordService.deleteById(id, username);
  }

  @Get(':id')
  async getById(
    @Param('id') id: string,
    @LoggedInUser() user: SecureUser,
  ): Promise<RecordDto> {
    const { username } = user;

    return this.recordService.getById(id, username);
  }

  @Get('/wallet/:walletId')
  async getByWallet(
    @Param('walletId') walletId: string,
    @LoggedInUser() user: SecureUser,
  ): Promise<RecordDto[]> {
    const { username } = user;

    return this.recordService.getByWallet(walletId, username);
  }

  @Put(':id')
  async updateById(
    @Param('id') id: string,
    @Body() record: UpdateRecordDto,
    @LoggedInUser() user: SecureUser,
  ): Promise<RecordDto> {
    const { username } = user;
    const { description, value, walletId, timestamp, categoryId } = record;

    return this.recordService.updateById(
      id,
      username,
      description,
      value,
      timestamp,
      walletId,
      categoryId,
    );
  }

  @Post('/existingExternalReferences')
  async checkIfExternalReferencesExist(
    @Body() body: CheckExternalReferencesDto,
    @LoggedInUser() user: SecureUser,
  ) {
    const { username } = user;

    return this.recordService.checkIfExternalReferencesExist(
      body.references,
      username,
    );
  }

  @Post('/bulkCreate')
  async createManyRecords(
    @Body() body: CreateManyRecordsDto,
    @LoggedInUser() user: SecureUser,
  ): Promise<RecordDto[]> {
    const { username } = user;
    const records = body.records;

    return this.recordService.createManyRecords(records, username);
  }
}
