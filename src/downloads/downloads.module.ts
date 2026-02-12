import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Downloads } from './downloads.model';
import { DownloadsService } from './downloads.service';
import { DownloadsController } from './downloads.controller';

@Module({
  imports: [SequelizeModule.forFeature([Downloads])],
  providers: [DownloadsService],
  controllers: [DownloadsController],
})
export class DownloadsModule {}
