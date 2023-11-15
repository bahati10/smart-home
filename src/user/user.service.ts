import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import {v4 as uuidv4} from "uuid";

@Injectable()
export class UserService{
    constructor(
        @InjectModel(User)
        private readonly userModel: typeof User,
    ){}

      async findAll(): Promise<User[]> {
        return await this.userModel.findAll();
      }
    
      async findById(id: string): Promise<User | null> {
    try {
    const user = await this.userModel.findByPk(id);

    if(!user){
      throw new NotFoundException("User not found");
    }


    return user;
    } catch (error) {
      throw new Error(error)
    }
      }
    
      async createUser(user: User): Promise<User> {
        try {
          const _user =  await this.userModel.create({...user, id: uuidv4()});
          return _user;
        } catch (error) {
          throw Error(error)
        }
 
      }
    
      async updateUser(id: number, updatedUser: User): Promise<[number, User[]]> {
        return this.userModel.update(updatedUser, { where: { id }, returning: true });
      }
    
      async deleteUser(id: string): Promise<void> {
       try {
        const user = await this.findById(id);
        return await user.destroy();
       } catch (error) {
        throw new Error(error)
       }
      }
}
