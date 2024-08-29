import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

export type UserRoleType = "admin" | "employee" | "veterinerian"

@Entity({ name: "utilisateur" })
export class User {
    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @Column({ name: "username", type: "varchar", length: 50, nullable: false })
    username: string;

    @Column({ name: "password", type: "varchar", length: 50, nullable: false })
    password: string;

    @Column({ name: "nom", type: "varchar", length: 100, nullable: false })
    lastname: string;

    @Column({ name: "prenom", type: "varchar", length: 50, nullable: false })
    firstname: string;

    @Column({ name: "email", type: "varchar", length: 100, nullable: false })
    email: string;

    @Column({ name: "role", type: "enum", enum: ["admin", "employee", "veterinerian"], nullable: false })
    role: UserRoleType;
}