// src/graphql/graphql.module.ts

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserResolver } from '../user/user.resolver';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';


@Module({
  imports: [UserModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      cors: true,
      watch: true
    }),
  ],
  providers: [UserResolver],
})
export class GraphqlModule {}
