import { Module } from '@nestjs/common';
import { ExhibitsService } from './exhibits.service';
import { ExhibitsController } from './exhibits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exhibit } from './exhibits.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Exhibit])],
    providers: [ExhibitsService],
    controllers: [ExhibitsController],
    exports: [ExhibitsService],
})
export class ExhibitsModule { }