import { Table, Column, PrimaryKey, AutoIncrement, Unique, Default, AllowNull, Index } from "sequelize-typescript";
import * as scalars from "graphql-scalars"
import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { DataType, Model } from "sequelize-typescript";
import  { v4  as uuidv4 } from "uuid";
import { UUIDV4 } from "sequelize";

@ObjectType()
@InputType("IUser")
@Table({
    omitNull: true,
    paranoid: true,
    tableName: "User",
    timestamps: true
})
export class User extends Model<User>{
    @Index
    @PrimaryKey
    @Field((type) => String)
    @Default(UUIDV4)
    @Column({type: DataType.STRING})
    id: string =  uuidv4();

    @Field(() => String)
    @Column({type: DataType.STRING})
    avatar?: string;

    @Field(() => String)
    @Column({type: DataType.STRING})
    firstname: string;
    
    @Field(() => String)
    @Column({type: DataType.STRING})
    lastname: string;

    @Field(() => String)
    @Unique
    @Column({type: DataType.STRING})
    username: string

    @Field(() => String)
    @Column({type: DataType.STRING})
    password: string

    @Field(() => Number)
    @Unique
    @Column({type: DataType.INTEGER})
    phonenumber: number;

    @Column({type: DataType.DATE})
    @Field(() => scalars.GraphQLDateTime, {nullable: true})
    createdAt: Date;

    @Column({type: DataType.DATE})
    @Field(() => scalars.GraphQLDateTime, {nullable: true}) 
    updatedAt: Date;

    @Column({type: DataType.DATE})
    @Field(() => scalars.GraphQLDateTime, {nullable: true}) 
    deletedAt: Date;

}
