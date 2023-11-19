import { Table, Column, PrimaryKey, AutoIncrement, Unique, Default, AllowNull, Index } from "sequelize-typescript";
import * as scalars from "graphql-scalars"
import { Field, ObjectType, InputType, ID } from '@nestjs/graphql';
import { DataType, Model } from "sequelize-typescript";
import  { v4  as uuidv4 } from "uuid";
import { UUIDV4 } from "sequelize";
import { DeviceCategory } from "./device.category.enum";
import { User } from "src/user/user.model";

@ObjectType()
@InputType("IDevice")
@Table({
    omitNull: true,
    paranoid: true,
    tableName: "Device",
    timestamps: true
})
export class Device extends Model<Device>{
    @Index
    @PrimaryKey
    @Field((type) => String)
    @Default(UUIDV4)
    @Column({type: DataType.STRING})
    id?: string =  uuidv4();
    
    @Field(() => String)
    @Unique
    @Column({type: DataType.STRING})
    name?: string;

    @Field(() => String)
    @Column({type: DataType.ENUM(...Object.values(DeviceCategory))})
    category?: DeviceCategory;

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

