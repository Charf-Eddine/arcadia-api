import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
    private readonly saltOrRounds = 10;

    hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, this.saltOrRounds);
    }

    comparePasswords(password: string, storedPasswordHash: string): Promise<boolean> {
        return bcrypt.compare(password, storedPasswordHash);
    }

}