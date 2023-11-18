import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../user/user.model";
import { UserService } from "../user/user.service";
import { databaseConfigs } from "src/config/database.config";

@Module({
  imports: [
    ConfigModule,
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService?: ConfigService) => ({
        dialect: "postgres",
        uri:
          configService.get<string>("NODE_ENV") === "development"
            ? databaseConfigs.development.uri
            : configService.get<string>("NODE_ENV") === "staging"
            ? databaseConfigs.staging.uri
            : databaseConfigs.production.uri,
        models: [User],

        autoLoadModels: true,
        synchronize: true,
        sync: {
          alter: true,
          //force: true,
        },
      }),
      inject: [ConfigService],
    }),
    SequelizeModule.forFeature([User]),
  ],
  providers: [UserService],
  controllers: [],
})
export class DatabaseModule {}
