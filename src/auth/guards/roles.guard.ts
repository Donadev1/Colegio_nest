import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!user || !requiredRoles) {
      return false;
    }

    // Aquí se valida directamente el rol desde el JWT
    return requiredRoles.includes(user.rol);

  }
}
