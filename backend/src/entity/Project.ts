import {Entity, Column, PrimaryGeneratedColumn, JoinTable, OneToMany} from "typeorm";
import {ProjectUser} from "./ProjectUser";

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

    @Column({default: true})
    isActive:boolean

    @OneToMany(() => ProjectUser, projectUser => projectUser.project,{
        persistence: false,
        cascade: ['insert', 'update']
    })
    @JoinTable()
    projectUser:ProjectUser[];

}
