import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { BannersModule } from './banners/banners.module';
import { ConfigModule } from '@nestjs/config';
import { DownloadsModule } from './downloads/downloads.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    DatabaseModule,
    BannersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DownloadsModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
