import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async googleLogin(profile: any) {
    const user = await this.usersService.findOrCreate(profile);

    const payload = {
        sub: (user as any)._id.toString(),
        email: user.email,
        role: user.role,
        status: user.status,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      user,
    };
  }
}