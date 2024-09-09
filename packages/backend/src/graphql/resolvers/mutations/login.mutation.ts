import { User } from "../../../models/User"
import bcrypt from "bcrypt";

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ email }).lean<UserLogin>().exec()
  if (!user) {
    return null
  }
  const wrongPassword = !await bcrypt.compare(password, user.password)
  if (wrongPassword) {
    return null
  }
  return {
    ...user,
    password: null,
  }
}
