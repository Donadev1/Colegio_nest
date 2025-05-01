export class Usuarios{
    id_Usuario: number;
    d_identidad: string;
    nombre: string;
    correo:string;
    contrasena:string;
    rol: 'Estudiante' | 'Docente' | 'Administrativo' | 'Administrador' | 'Acudiente';
}