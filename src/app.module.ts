import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
// import { SequelizeModule } from '@nestjs/sequelize';
// import { CacheModule } from './cashe/cache.module';
import * as dotenv from "dotenv"
import { GraphqlModule } from './graphql/graphql.module';
import { UserModule } from './user/user.module';

dotenv.config();

@Module({
  imports: [
    DatabaseModule,
    GraphqlModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
