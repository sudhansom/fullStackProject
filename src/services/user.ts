import Users, { UserDocument } from '../models/Users'
import { NotFoundError } from '../helpers/apiError'

const findAll = async (): Promise<UserDocument[]> => {
  return Users.find().sort({ name: 1 })
}

const create = async (user: UserDocument): Promise<UserDocument> => {
  return user.save()
}

export default {
  create,
  findAll,
}
