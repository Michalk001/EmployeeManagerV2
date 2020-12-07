import {Column, Entity, ManyToOne} from "typeorm";
import {Project} from "./Project";
import {User} from "./User";

@Entity()
export class ProjectUser {

    @ManyToOne(type => User, user => user.projectUser, { primary: true })
    user: User;
    @ManyToOne(type => Project, project => project.projectUser, { primary: true })
    project: Project;
    @Column({default: true})
    isActive:boolean
    @Column({default: false})
    isRemove:boolean
    @Column({default: 0})
    hour:number
}