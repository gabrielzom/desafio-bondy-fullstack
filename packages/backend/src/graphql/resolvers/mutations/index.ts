import { GraphQLResolveInfo } from 'graphql'
import { mutationTest } from './mutationTest'
import { login } from "./login.mutation";

export default {
  mutationTest: (
    parent: any,
    args: any,
    context: any,
    info: GraphQLResolveInfo
  ) => mutationTest(parent, args, context, info),
  login: (_, {email, password}) => {
    return login(email, password)
  }
}
