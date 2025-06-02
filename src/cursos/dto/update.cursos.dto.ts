import { PartialType } from "@nestjs/mapped-types";
import { CreateCursoDto } from "./create_cursos.dto";

export class UpdateCursoDto extends PartialType(CreateCursoDto){}