import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Project} from "./Project";
import {User} from "./User";

@Entity()
export class ProjectUser {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    @ManyToOne(type => User, user => user.projectUser, { primary: true, persistence: false })
    user: User;
    @ManyToOne(type => Project, project => project.projectUser, { primary: true, persistence: false })
    project: Project;
    @Column({default: true})
    isActive:boolean
    @Column({default: false})
    isRemove:boolean
    @Column({default: 0})
    hour:number
}