
import { Express } from "express";
import Auth from './Auth'
import User from './User'
import Project from './Project'

export const routes = (app:Express) => {
    app.use("/auth",Auth);
    app.use("/user",User)
    app.use("/project",Project)
}