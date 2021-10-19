import Users, { UserDocument } from '../models/Users'
import { NotFoundError } from '../helpers/apiError'
import Address, { AddressDocument } from '../models/Address'

const findAll = async (): Promise<UserDocument[]> => {
  return Users.find().sort({ name: 1 })
}

const create = async (user: UserDocument): Promise<UserDocument> => {
  return user.save()
}
const findById = async (userId: string): Promise<UserDocument> => {
  const foundUser = await Users.findById(userId)
  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }
  return foundUser
}

const update = async (
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> => {
  const foundUser = await Users.findByIdAndUpdate(userId, update, {
    new: true,
  })
  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }
  return foundUser
}

const deleteUser = async (userId: string): Promise<UserDocument | null> => {
  const foundUser = Users.findByIdAndDelete(userId)

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }
  return foundUser
}

const findOrCreate = async (
  name: string,
  lastName: string,
  email: string
): Promise<UserDocument | null> => {
  //return await Users.find().sort({ name: 1 })
  const foundUser = Users.findById('616865a7a23cd71916580b93')
  console.log('inside findOrCreate:-', foundUser)
  if (!foundUser) {
    throw new NotFoundError('User not found')
  }
  return foundUser
  //return 'sudhan'
}

export default {
  create,
  findAll,
  findById,
  update,
  deleteUser,
  findOrCreate,
}
