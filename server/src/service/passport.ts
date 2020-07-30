import dotenv from "dotenv";
import passport from "passport";
import passportJWT from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import memberDAO from "../db/memberDAO";

dotenv.config();

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const SUCCESS_MSG = "Logged In Successfully";
const FAIL_MSG = "Incorrect email or password";

export default function () {
    // Local Strategy
    // passport.authenticate('local') 에서 사용된다.
    passport.use(
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password",
            },
            async function (email, password, done) {
                const result = await memberDAO.getMemberWhereEmailPassword(
                    email,
                    password
                );
                if (!result) {
                    return done(null, false, { message: FAIL_MSG });
                }
                return done(null, result, { message: SUCCESS_MSG });
            }
        )
    );

    // JWT Strategy
    // passport.authenticate('jwt')에서 사용된다.
    passport.use(
        new JWTStrategy(
            {
                jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
                // jwtFromRequest: ExtractJWT.fromBodyField('auth'), // bearerToken으로 잘 안될시 대체
                secretOrKey: process.env.JWT_SECRET,
            },
            async function (jwtPayload, done) {
                const result = await memberDAO.getMemberWhereEmail(jwtPayload.email);
                return done(null, result);
            }
        )
    );
}
