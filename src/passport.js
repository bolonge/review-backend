import passport from "passport";
import JwtStractegy from "passport-jwt";

const jwtOptions = {
  jwtFromRequest: JwtStractegy.ExtractJwt.fromAuthHeaderAsBearerToken()
};
