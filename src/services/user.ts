import Users, { UserDocument } from '../models/Users'
import { NotFoundError } from '../helpers/apiError'

const findAll = async (): Promise<UserDocument[]> => {
  return Users.find().sort({ name: 1 })
}
