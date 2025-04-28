import { Module } from '@nestjs/common';
import { AcudientesController } from './acudientes.controller';
import { AcudientesService } from './acudientes.service';

@Module({
  controllers: [AcudientesController],
  providers: [AcudientesService]
})
export class AcudientesModule {}
