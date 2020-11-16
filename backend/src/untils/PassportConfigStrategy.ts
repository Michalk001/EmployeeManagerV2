import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt"
import passport from "passport"
import { getRepository } from "typeorm";
import {User} from "../entity/User";
import AppConfig from "../config/AppConfig.json"

export const PassportConfigStrategy = () => {

    passport.use(
        new JwtStrategy({
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: AppConfig.jwtSecret
            },
            (jwtpayload, done) => {
                const userRepository = getRepository(User);
                userRepository.findOne({ where: { id: jwtpayload.userId } })
                    .then(user => {
                        {
                            if (user) {

                                return done(null, user)
                            }
                            return done(null, false)
                        }
                    })
            }
        )
    )
}