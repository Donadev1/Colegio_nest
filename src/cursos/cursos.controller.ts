import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CursosService } from './cursos.service';
import { CreateCursoDto } from './dto/create_cursos.dto';
import { UpdateCursoDto } from './dto/update.cursos.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('cursos')
export class CursosController {
    constructor(private readonly cursoServices: CursosService) {}

    
    // Aquí puedes definir los endpoints del controlador, por ejemplo:
    @UseGuards(AuthGuard,RolesGuard)
    @Post()
    async createCurso(@Body() createcursoDto: CreateCursoDto) {
        const result = await this.cursoServices.CreateCourse(createcursoDto);
        if (!result) {
            throw new HttpException(
                'No se pudo crear el nuevo curso',
                HttpStatus.CONFLICT
            );
        }
        return {
            message: 'Curso creado Exitosamente',
            curso: result,
        };
    }
    @UseGuards(AuthGuard, RolesGuard)
    @Get()
    async getAllCursos() {
        return await this.cursoServices.GetAllCourses();
    }
    @UseGuards(AuthGuard,RolesGuard)
    @Get(':id_curso')
    async getCursoById(@Param('id_curso') id_curso: string) {
        const result = await this.cursoServices.GetCouseById(+id_curso);
        if (!result) {
            throw new HttpException(
                'Curso no encontrado',
                HttpStatus.NOT_FOUND
            );
        }
        return result;
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Delete(':id_curso')
    async deleteCurso(@Param('id_curso') id_curso: string) {
        const result = await this.cursoServices.DeleteCourse(+id_curso);
        if (!result) {
            throw new HttpException(
                'No se pudo eliminar el curso, posiblemente tiene estudiantes asociados',
                HttpStatus.CONFLICT // 409 Conflict
            );
        }
        return {
            message: 'Curso eliminado Exitosamente',
        };
    }
    
    @UseGuards(AuthGuard,RolesGuard)
    @Put(':id_curso')
    async updateCurso(@Param('id_curso') id_curso: string, @Body()data: UpdateCursoDto) {
        const result = await this.cursoServices.UpdateCourse(+id_curso, data);
        if (!result) {
            throw new HttpException(
                'No se pudo actualizar el curso',
                HttpStatus.CONFLICT // 409 Conflict
            );
        }
        return {
            message: 'Curso actualizado Exitosamente',
        };
    }
}
