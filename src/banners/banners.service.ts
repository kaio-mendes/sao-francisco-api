import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Banner } from './banner.model';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BannersService {
  constructor(
    @InjectModel(Banner)
    private bannerModel: typeof Banner,
    private configService: ConfigService,
  ) {}

  findAll() {
    return this.bannerModel.findAll({
      attributes: ['id', 'filepath', 'url', 'caption'],
    });
  }
}
