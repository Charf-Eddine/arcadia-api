import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { UserDetailsDto } from "./dto/user-details.dto";
import { UsersService } from "src/users/users.service";
import { ContactUsDto } from "./dto/contact-us.dto";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class MailingService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly usersService: UsersService,
    private configService: ConfigService,
  ) {}

  async sendAccountCreationMail(userDetails: UserDetailsDto) {
    let user = await this.usersService.findOne(userDetails.userId);
    await this.mailerService.sendMail({
        to: user.email,
        subject: `Bienvenue sur Arcadia – Votre compte a été créé !`,
        template: `new-user-account`,
        context: {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            login_page_url: this.configService.get('LOGIN_PAGE_URL')
        },
    });
  }

  async contactUs(contactUsDto: ContactUsDto) {
    await this.mailerService.sendMail({
        from: contactUsDto.email,
        to: this.configService.get('CONTACT_US_EMAIL'),
        subject: contactUsDto.subject,
        html: contactUsDto.message
    });
  }
}