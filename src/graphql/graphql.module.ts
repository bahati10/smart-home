// src/graphql/graphql.module.ts

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserResolver } from '../user/user.resolver';
import { UserModule } from '../user/user.module';
import { DeviceResolver } from 'src/device/device.resolver';
import { DeviceModule } from 'src/device/device.module';


@Module({
  imports: [UserModule, DeviceModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      cors: true,
      watch: true
    }),
  ],
  providers: [UserResolver, DeviceResolver],
})
export class GraphqlModule {}
