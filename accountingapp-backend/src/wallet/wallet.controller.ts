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
import CreateWalletDto from './dtos/create-wallet.dto';
import UpdateWalletDto from './dtos/update-wallet.dto';
import { WalletService } from './wallet.service';

@UseGuards(AuthenticatedGuard)
@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  async createWallet(
    @Body() wallet: CreateWalletDto,
    @LoggedInUser() user: SecureUser,
  ) {
    return this.walletService.create(
      wallet.name,
      wallet.balance,
      user.username,
    );
  }

  @Get()
  async getByUser(@Param('id') id: string, @LoggedInUser() user: SecureUser) {
    return this.walletService.getByUser(user.username);
  }

  @Get(':id')
  async getById(@Param('id') id: string, @LoggedInUser() user: SecureUser) {
    return this.walletService.getById(id, user.username);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string, @LoggedInUser() user: SecureUser) {
    return this.walletService.deleteById(id, user.username);
  }

  @Put(':id')
  async updateById(
    @Param('id') id: string,
    @LoggedInUser() user: SecureUser,
    @Body() updatedWallet: UpdateWalletDto,
  ) {
    return this.walletService.updateById(
      id,
      updatedWallet.name,
      updatedWallet.balance,
      user.username,
    );
  }

  @Put(':id/updateBalance')
  async updateBalance(
    @Param('id') id: string,
    @LoggedInUser() user: SecureUser,
  ) {
    // return this.walletService.recalculateCurrentBalance(id, user.username);
  }
}
