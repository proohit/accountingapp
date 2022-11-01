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
import dayjs from 'dayjs';
import { AuthenticatedGuard } from '../../auth/authenticated.guard';
import { LoggedInUser } from '../../auth/user.decorator';
import { SecureUser } from '../../users/entities/secure-user';
import CreateRecurrentRecordDto from './dtos/create-recurrent-record.dto';
import UpdateRecurrentRecordDto from './dtos/update-recurrent-record.dto';
import { RecurrentRecord } from './entities/recurrent-record.entity';
import { RecurrentRecordService } from './recurrent-record.service';

@UseGuards(AuthenticatedGuard)
@Controller('recurrent-records')
export class RecurrentRecordController {
  constructor(
    private readonly recurrentRecordService: RecurrentRecordService,
  ) {}

  @Get('/')
  async getByUser(@LoggedInUser() user: SecureUser) {
    const { username } = user;

    return this.recurrentRecordService.getByUser(username);
  }

  @Post()
  async createNewRecurrentRecord(
    @LoggedInUser() user: SecureUser,
    @Body() body: CreateRecurrentRecordDto,
  ) {
    const { username } = user;
    const {
      description,
      value,
      startDate,
      endDate,
      periodicity,
      walletId,
      categoryId,
    } = body;

    const recurrentRecord = new RecurrentRecord();
    recurrentRecord.categoryId = categoryId;
    recurrentRecord.walletId = walletId;
    recurrentRecord.description = description;
    recurrentRecord.value = value;
    recurrentRecord.endDate = endDate;
    recurrentRecord.periodicity = periodicity;
    recurrentRecord.startDate = startDate;
    recurrentRecord.ownerUsername = username;

    return this.recurrentRecordService.createRecurrentRecord(
      recurrentRecord,
      username,
    );
  }

  @Delete(':id')
  async deleteById(@LoggedInUser() user: SecureUser, @Param('id') id: string) {
    const { username } = user;

    await this.recurrentRecordService.deleteById(id, username);

    return { data: { message: `Deleted recurrent record ${id}` }, status: 200 };
  }

  @Get(':id')
  async getById(@LoggedInUser() user: SecureUser, @Param('id') id: string) {
    const { username } = user;

    return this.recurrentRecordService.getById(id, username);
  }

  @Put(':id')
  async updateById(
    @LoggedInUser() user: SecureUser,
    @Param('id') id: string,
    @Body() body: UpdateRecurrentRecordDto,
  ) {
    const { username } = user;
    const {
      description: updatedDescription,
      value: updatedValue,
      startDate: updatedStartDate,
      endDate: updatedEndDate,
      walletId: updatedWalletId,
      categoryId: updatedCategoryId,
      periodicity: updatedPeriodicity,
    } = body;

    const recurrentRecord = new RecurrentRecord();
    recurrentRecord.id = id;
    recurrentRecord.categoryId = updatedCategoryId;
    recurrentRecord.walletId = updatedWalletId;
    recurrentRecord.description = updatedDescription;
    recurrentRecord.value = updatedValue;
    recurrentRecord.endDate = dayjs(updatedEndDate).toDate();
    recurrentRecord.startDate = dayjs(updatedStartDate).toDate();
    recurrentRecord.periodicity = updatedPeriodicity;
    recurrentRecord.ownerUsername = username;

    const updatedRecurrentRecord = await this.recurrentRecordService.updateById(
      recurrentRecord,
      username,
    );

    return { status: 200, data: updatedRecurrentRecord };
  }
}
