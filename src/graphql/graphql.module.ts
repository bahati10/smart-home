// src/graphql/graphql.module.ts

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserResolver } from '../user/user.resolver';
import { UserModule } from '../user/user.module';
import { DeviceResolver } from 'src/device/device.resolver';
import { DeviceModule } from 'src/device/device.module';
import { AreaResolver } from 'src/area/area.resolver';
import { AreaModule } from 'src/area/device.module';


@Module({
  imports: [UserModule, DeviceModule, AreaModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      cors: true,
      watch: true
    }),
  ],
  providers: [UserResolver, DeviceResolver, AreaResolver],
})
export class GraphqlModule {}
