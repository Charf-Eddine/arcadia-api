import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { MailingService } from "./mailing.service";
import { ApiBadRequestResponse, ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserDetailsDto } from "./dto/user-details.dto";
import { ContactUsDto } from "./dto/contact-us.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@ApiTags("Mailing")
@Controller("mailing")
export class MailingController {
    constructor(private mailingService: MailingService) {}

    @ApiBadRequestResponse({ description: 'Body data is wrong.' })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('/send-account-creation-mail')
    async sendAccountCreationMail(@Body() userDetails: UserDetailsDto) {
        return await this.mailingService.sendAccountCreationMail(userDetails);
    }

    @ApiBadRequestResponse({ description: 'Body data is wrong.' })
    @Post('/contact-us')
    async contactUs(@Body() contactUsDto: ContactUsDto) {
        return await this.mailingService.contactUs(contactUsDto);
    }
}