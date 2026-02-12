import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Downloads } from './downloads.model';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DownloadsService {
  constructor(
    @InjectModel(Downloads)
    private downloads: typeof Downloads,
    private configService: ConfigService,
  ) {}

  findAll() {
    return this.downloads.findAll();
  }
}
