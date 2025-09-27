import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAdminDto } from './dto/login-admin.dto';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiBadRequestResponse({ description: 'Bad request' })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiInternalServerErrorResponse({ description: 'Internal server error' })
@Controller('admin')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'login to dashboard',
    description: 'Admin can login to dashboard',
  })
  @ApiOkResponse({ description: 'Ok' })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginAdminDto) {
    return this.authService.login(dto);
  }

  // @ApiOperation({
  //   summary: 'logout of dashboard',
  //   description: 'Admin can logout of dashboard',
  // })
  // @ApiOkResponse({ description: 'Ok' })
  // @Post('logout')
  // logout(@Body() dto: LogoutAdminDto) {
  //   return this.authService.logout(dto);
  // }
}
