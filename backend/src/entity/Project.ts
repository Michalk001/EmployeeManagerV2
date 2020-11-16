import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable} from "typeorm";
import {User} from "./User";

@Entity()
export class Project {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type: "varchar", charset: "utf8mb4", collation: "utf8mb4_unicode_ci", length: 150})
    name: string;

    @Column({type: "varchar", charset: "utf8mb4", collation: "utf8mb4_unicode_ci", length: 10000})
    description: string;


    @Column({default: false})
    isRemove:boolean;

    @ManyToMany(() => User, user => user.projects)
    @JoinTable()
    users:User[];

}
