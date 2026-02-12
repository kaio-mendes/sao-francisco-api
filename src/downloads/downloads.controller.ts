import { Controller, Get } from '@nestjs/common';
import { DownloadsService } from './downloads.service';

@Controller('downloads')
export class DownloadsController {
  constructor(private readonly downloadsService: DownloadsService) {}

  @Get()
  findAll() {
    return this.downloadsService.findAll();
  }
}
