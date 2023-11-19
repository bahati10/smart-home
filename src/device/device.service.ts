import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Device } from './device.model';
import {v4 as uuidv4} from "uuid";

@Injectable()
export class DeviceService{
    constructor(
        @InjectModel(Device)
        private readonly deviceModel: typeof Device,
    ){}

      async findAll(): Promise<Device[]> {
        return await this.deviceModel.findAll();
      }


    
      async findById(id: string): Promise<Device | null> {
    try {
    const device = await this.deviceModel.findByPk(id);

    if(!device){
      throw new NotFoundException("Device not found");
    }


    return device;
    } catch (error) {
      throw new Error(error)
    }
      }
    
      async createDevice(device: Device): Promise<Device> {
        try {
          const _device =  await this.deviceModel.create({...device, id: uuidv4()});
          return _device;
        } catch (error) {
          throw Error(error)
        }
 
      }
    
      async updateDevice(id: string, updatedDevice: Device): Promise<[number, Device[]]> {
        try {
        const device = await this.findById(id);
        return this.deviceModel.update(updatedDevice, { where: { id }, returning: true });
        } catch (error) {
          throw Error(error)
          
        }
      }
    
      async deleteDevice(id: string): Promise<void> {
       try {
        const device = await this.findById(id);
        return await device.destroy();
       } catch (error) {
        throw new Error(error)
       }
      }
}
