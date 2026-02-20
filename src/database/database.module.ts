// src/database/database.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Banner } from 'src/banners/banner.model';
import { Categories } from 'src/categories/categories.model';
import { Downloads } from 'src/downloads/downloads.model';
import { Products } from 'src/products/products.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadModels: false,
      models: [Banner, Downloads, Products, Categories],
      synchronize: false,
    }),
  ],
})
export class DatabaseModule {}
