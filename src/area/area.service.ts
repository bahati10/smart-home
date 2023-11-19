import { HttpException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Area } from './area.model';
import {v4 as uuidv4} from "uuid";

@Injectable()
export class AreaService{
    logger = new Logger('Area Service');
    constructor(
        @InjectModel(Area)
        private readonly areaModel: typeof Area,
    ){}

      async findAll(): Promise<Area[]> {
        return await this.areaModel.findAll();
      }


    
      async findById(id: string): Promise<Area | null> {
    try {
    const area = await this.areaModel.findByPk(id);

    if(!area){
      throw new NotFoundException("Area not found");
    }


    return area;
    } catch (error) {
      throw new Error(error)
    }
      }
    
      async createArea(area: Area): Promise<Area> {
        try {
          const _area =  await this.areaModel.create({...area, id: uuidv4()});
          this.logger.debug("New area created", _area);
          return _area;
        } catch (error) {
          throw Error(error)
        }
 
      }
    
      async updateArea(id: string, updatedArea: Area): Promise<[number, Area[]]> {
        try {
        const area = await this.findById(id);
        return this.areaModel.update(updatedArea, { where: { id }, returning: true });
        } catch (error) {
          throw Error(error)
          
        }
      }
    
      async deleteArea(id: string): Promise<void> {
       try {
        const area = await this.findById(id);
        return await area.destroy();
       } catch (error) {
        throw new Error(error)
       }
      }
}
