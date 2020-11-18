import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable} from "typeorm";
import {Project} from "./Project";

@Entity()
export class    User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type: "varchar", charset: "utf8mb4", collation: "utf8mb4_unicode_ci", length: 150})
    firstName: string;

    @Column({type: "varchar", charset: "utf8mb4", collation: "utf8mb4_unicode_ci", length: 150})
    lastName: string;

    @Column({unique:true,type: "varchar", charset: "utf8mb4", collation: "utf8mb4_unicode_ci", length: 150})
    username: string

    @Column({unique:true,type: "varchar", charset: "utf8mb4", collation: "utf8mb4_unicode_ci", length: 150})
    email: string

    @Column({type: "varchar", charset: "utf8mb4", collation: "utf8mb4_unicode_ci", length: 150})
    password:string

    @Column({type: "varchar", charset: "utf8mb4", collation: "utf8mb4_unicode_ci", length: 20, default:null})
    phoneNumber:string|null

    @Column({default: false})
    isAdmin:boolean

    @Column({default: false})
    isRemove:boolean

    @ManyToMany(() => Project, project => project.users)
    projects: Project[];
}
