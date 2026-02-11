import { Module } from '@nestjs/common';
import { BannersService } from './banners.service';
import { BannersController } from './banners.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Banner } from './banner.model';

@Module({
  imports: [SequelizeModule.forFeature([Banner])],
  providers: [BannersService],
  controllers: [BannersController],
})
export class BannersModule {}
