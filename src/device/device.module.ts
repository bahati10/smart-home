import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Device } from "./device.model";
import { DeviceService } from "./device.service";


@Module({
    imports: [SequelizeModule.forFeature([Device])],
    controllers: [],
    providers: [DeviceService],
    exports: [DeviceService]
})

export class DeviceModule {}
