
import { Controller, Request, Post, UseGuards, HttpCode, Get, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBadRequestResponse, ApiBearerAuth, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginDto } from './dto/login.dto';

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}
    
    @ApiOkResponse({ description: "Login successfully." })
    @ApiBadRequestResponse({ description: "Params are wrong." })
    @ApiInternalServerErrorResponse({ description: "Internal server error." })
    @ApiUnauthorizedResponse({ description: "Wrong email/password." })
    @UseGuards(AuthGuard('local'))
    @Post('login')
    @HttpCode(200)
    async login(@Body() login: LoginDto, @Request() req) {
        return this.authService.login(req.user);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
}