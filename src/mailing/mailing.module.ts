import { Module } from "@nestjs/common";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { MailingController } from "./mailing.controller";
import { MailingService } from "./mailing.service";
import { MailerModule } from "@nestjs-modules/mailer";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UsersService } from "src/users/users.service";
import { DatabaseModule } from "src/database/database.module";

@Module({
  imports: [
    DatabaseModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get("SMTP_HOST"),
          port: configService.get("SMTP_PORT"),
          auth: {
            user: configService.get("SMTP_USER"),
            pass: configService.get("SMTP_PASS"),
          },
          //requireTLS: true,
          //secure: false,
          secure: true,
        },
        defaults: {
          from: `No reply <${configService.get("SMTP_USER")}>`,
        },
        template: {
          dir: process.cwd() + "/src/mailing/templates/",
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [MailingController],
  providers: [MailingService, UsersService],
})
export class MailingModule { }