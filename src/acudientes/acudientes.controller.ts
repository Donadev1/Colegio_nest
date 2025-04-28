import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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
    async DeleteAcudiente(id_Acudiente:number): Promise<boolean>{
    return this.acudienteService.DeleteAcudiente(+id_Acudiente);
    }
}
