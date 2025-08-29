import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { reports } from '../reports/reports.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([reports])],
  providers: [ReportsService],
  controllers: [ReportsController],
})
export class ReportsModule {}
