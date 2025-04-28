import { PartialType } from '@nestjs/mapped-types';
import { CreateAcudienteDto } from './create.Acudiente.dto';

export class UpdateAcudienteDto extends PartialType(CreateAcudienteDto) {}