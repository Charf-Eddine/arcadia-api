import { Controller, Request, Post, UseGuards, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags("Auth")
@Controller("auth")
@Controller()
export class AuthController {

    @ApiOkResponse({ description: "Login successfully." })
    @ApiBadRequestResponse({ description: "Params are wrong." })
    @ApiInternalServerErrorResponse({ description: "Internal server error." })
    @ApiUnauthorizedResponse({ description: "Wrong email/password." })
    @UseGuards(AuthGuard('local'))
    @Post('login')
    @HttpCode(200)
    async login(@Request() req) {
    return req.user;
    }
}