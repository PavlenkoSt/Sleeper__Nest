import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { AUTH_SERVICE } from '../constants';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, map, of, tap } from 'rxjs';
import { UserDto } from '../dto';

export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}

  canActivate(context: ExecutionContext) {
    const jwt = context.switchToHttp().getRequest().cookies?.Authentication;
    if (!jwt) {
      return false;
    }

    return this.authClient
      .send<UserDto>('authenticate', {
        Authentication: jwt,
      })
      .pipe(
        tap((res) => {
          context.switchToHttp().getRequest().user = res;
        }),
        map(() => {
          return true;
        }),
        catchError(() => {
          return of(false);
        }),
      );
  }
}
