import { Injectable } from '@nestjs/common';
import { Acudiente } from './entity/Acudiente.Entity';
import { AcudienteRepository } from './Acudiente.respository';
import { CreateAcudienteDto } from './DTO/create.Acudiente.dto';
import { UpdateAcudienteDto } from './DTO/update.user.dto';
@Injectable()
export class AcudientesService {
    constructor(private readonly acudienteRepository: AcudienteRepository){}

    async createAcudiente(CreateAcudienteDto: CreateAcudienteDto): Promise<Acudiente>{
        return await this.acudienteRepository.createAcudiente(CreateAcudienteDto);
    }

    async  GetAllacudientes():Promise<Acudiente[]>{
        return await this.acudienteRepository.GetAllacudientes()
    }

    async getAcudiente(id_Acudiente:number): Promise<Acudiente | null>{
        return await this.acudienteRepository.getAcudiente(id_Acudiente)
    }
    
    async UpdateAcudiente(id_Acudiente:number, data:UpdateAcudienteDto): Promise<boolean>{
        return await this.acudienteRepository.UpdateAcudiente(id_Acudiente, data);
    }

    async DeleteAcudiente(id_Acudiente:number): Promise<boolean>{
        return await this.acudienteRepository.DeleteAcudiente(id_Acudiente);
    }
     
}
