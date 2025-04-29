import { Body, Controller, Delete, Get, Param, Post, Put, HttpException, HttpStatus } from '@nestjs/common';
import { AcudientesService } from './acudientes.service';
import { CreateAcudienteDto } from './DTO/create.Acudiente.dto';
import { Acudiente } from './entity/Acudiente.Entity';
import { UpdateAcudienteDto } from './DTO/update.user.dto';

@Controller('acudientes')
export class AcudientesController {
    constructor(private readonly acudienteService: AcudientesService){}

    @Post()
    async CreateAcudientes(@Body() createacudienteDto: CreateAcudienteDto): Promise<Acudiente>{
        return await this.acudienteService.createAcudiente(createacudienteDto);
    }

    @Get()
    async  GetAllacudientes():Promise<Acudiente[]>{
        return await this.acudienteService.GetAllacudientes();
    }

    @Get(':id_Acudiente')
    async GetAcudiente(@Param('id_Acudiente') id_Acudiente:string){
        return this.acudienteService.getAcudiente(+id_Acudiente);
    }
    @Put(':id_Acudiente')
    async UpdateAcudiente(@Param('id_Acudiente') id_Acudiente:string, @Body()data:UpdateAcudienteDto): Promise<boolean>{
        return this.acudienteService.UpdateAcudiente(+id_Acudiente, data);
    }

    @Delete(':id_Acudiente')
    async DeleteAcudiente(@Param('id_Acudiente')id_Acudiente:string){
    const result = await this.acudienteService.DeleteAcudiente(+id_Acudiente);
    
    if (!result) {
        throw new HttpException(
            'No se pudo eliminar el acudiente, posiblemente tiene estudiantes asociados',
            HttpStatus.CONFLICT // 409 Conflict
        );
    }
    
    return {
        success: true,
        message: 'Acudiente eliminado exitosamente'
    };

    }
}
