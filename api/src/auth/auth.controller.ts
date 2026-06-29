import {
    Controller,
    Get,
    Req,
    Res,
    UseGuards,
  } from '@nestjs/common';
  
  import { AuthGuard } from '@nestjs/passport';
  
  import { AuthService } from './auth.service';
  import { JwtAuthGuard } from './guards/jwt-auth.guard';
  
  @Controller('auth')
  export class AuthController {
    constructor(
      private readonly authService: AuthService,
    ) {}
  
    @Get('google')
    @UseGuards(AuthGuard('google'))
    googleAuth() {}

    @Get("profile")
    @UseGuards(JwtAuthGuard)
    getProfile(@Req() req) {
    return req.user;
}
    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleCallback(
      @Req() req,
      @Res() res,
    ) {
      const result = await this.authService.googleLogin(req.user);
  
      return res.redirect(
        `http://localhost:5173/auth/callback?token=${result.accessToken}&role=${result.user.role}&status=${result.user.status}`,
      );
    }
  }