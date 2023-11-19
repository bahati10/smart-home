// device.resolver.ts

import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Device } from './device.model'; 
import { DeviceService } from './device.service';

@Resolver('DeviceResolver')
export class DeviceResolver {
  constructor(private readonly deviceService: DeviceService) {}

  @Query((returns) => [Device])
  async devices(): Promise<Device[]> {
    return this.deviceService.findAll();
  }

  @Query((returns) => Device)
  async device(@Args('id') id: string): Promise<Device | null> {
    return this.deviceService.findById(id);
  }

  @Mutation((returns) => Device)
  async createDevice(@Args('device') device: Device): Promise<Device> {
    try {
      return this.deviceService.createDevice(device);
    } catch (error) {
      console.error('Error creating device:', error);
      throw new Error(error);
    }
  }

  @Mutation((returns) => Device)
  async updateDevice(
    @Args('id') id: string,
    @Args('updatedDevice') updatedDevice: Device
  ): Promise<Device | null> {
    const [, [device]] = await this.deviceService.updateDevice(id, updatedDevice);
    return device;
  }

  @Mutation((returns) => ID)
  async deleteDevice(@Args('id') id: string): Promise<void> {
    return this.deviceService.deleteDevice(id);
  }
}
