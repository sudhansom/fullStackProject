import passport from 'passport'
import passportLocal from 'passport-local'
import GoogleTokenStrategy from 'passport-google-id-token'
import { Strategy } from 'passport-jwt'
import UserService from '../services/user'
import Users, { UserDocument } from '../models/Users'
import { Request, Response, NextFunction } from 'express'
import { AddressDocument } from '../models/Address'

export const googleStrategy = new GoogleTokenStrategy(
  {
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
  (parsedToken: any, googleId: any, done: any) => {
    //console.log('parsed token', parsedToken)
    const { given_name, family_name, email } = parsedToken.payload
    const users = UserService.findOrCreate(given_name, family_name, email)
    //const user = {'email': 'bkspoudel'}
    done(null, users)
  }
)
