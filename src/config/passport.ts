import passport from 'passport'
import passportLocal from 'passport-local'
import GoogleTokenStrategy from 'passport-google-id-token'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import UserService from '../services/user'
import { JWT_SECRET } from '../util/secrets'
import { UserDocument } from '../models/Users'

export const googleStrategy = new GoogleTokenStrategy(
  {
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
  async (parsedToken: any, googleId: any, done: any) => {
    console.log('parsed token', parsedToken)
    const { given_name, family_name, email } = parsedToken.payload
    const users = await UserService.findOrCreate(given_name, family_name, email)
    const user = { email: email }
    console.log('google user', users)
    done(null, users)
  }
)

export const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (payload: any, done: any) => {
    const { email } = payload.userData
    const user = await UserService.findByEmail(email)
    done(null, user)
  }
)
