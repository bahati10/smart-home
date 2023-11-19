// Area.resolver.ts

import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Area } from './area.model'; 
import { AreaService } from './area.service';

@Resolver('AreaResolver')
export class AreaResolver {
  constructor(private readonly areaService: AreaService) {}

  @Query((returns) => [Area])
  async areas(): Promise<Area[]> {
    return this.areaService.findAll();
  }

  @Query((returns) => Area)
  async Area(@Args('id') id: string): Promise<Area | null> {
    return this.areaService.findById(id);
  }

  @Mutation((returns) => Area)
  async createArea(@Args('area') Area: Area): Promise<Area> {
    try {
      return this.areaService.createArea(Area);
    } catch (error) {
      console.error('Error creating Area:', error);
      throw new Error(error);
    }
  }

  @Mutation((returns) => Area)
  async updateArea(
    @Args('id') id: string,
    @Args('updatedArea') updatedArea: Area
  ): Promise<Area | null> {
    const [, [Area]] = await this.areaService.updateArea(id, updatedArea);
    return Area;
  }

  @Mutation((returns) => ID)
  async deleteArea(@Args('id') id: string): Promise<void> {
    return this.areaService.deleteArea(id);
  }
}
