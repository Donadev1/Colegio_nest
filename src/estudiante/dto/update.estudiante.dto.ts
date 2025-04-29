import { PartialType } from '@nestjs/mapped-types';
import { CreateEstudianteDto } from './create.estudiante.dto';

export class UpdateStudentDto extends PartialType(CreateEstudianteDto) {}