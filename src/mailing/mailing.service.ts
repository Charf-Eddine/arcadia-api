import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { UserDetailsDto } from "./dto/user-details.dto";
import { UsersService } from "src/users/users.service";
import { ContactZooDto } from "./dto/contact-zoo.dto";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class MailingService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly usersService: UsersService,
    private configService: ConfigService,
  ) { }

  async sendAccountCreationMail(userDetails: UserDetailsDto) {
    let user = await this.usersService.findOne(userDetails.userId);
    await this.mailerService.sendMail({
      to: user.email,
      subject: `Bienvenue sur Arcadia – Votre compte a été créé !`,
      template: `new-user-account`,
      context: {
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        url: "https://www.google.fr"
      },
    });
  }

  async contactZoo(contactZooDto: ContactZooDto) {
    await this.mailerService.sendMail({
      from: contactZooDto.email,
      to: this.configService.get('CONTACT_US_EMAIL'),
      subject: contactZooDto.subject,
      html: contactZooDto.message
    });
  }
}