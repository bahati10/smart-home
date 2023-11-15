import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { databaseConfigs } from "../config/database.config";

@Module({
    imports: [
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
                models: [],

                autoLoadModels: true,
                synchronize: true,
                sync: {
                    alter: true,
                    force: false,
                },
            }),
            inject: [ConfigService],
        }),
        SequelizeModule.forFeature([]),
    ],
    providers: [],
    controllers: [],
})
export class DatabaseModule { }



