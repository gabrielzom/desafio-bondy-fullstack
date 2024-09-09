import gql from "graphql-tag";

export default gql`
  type User {
    email: String,
    name: String,
    company: String
  }
`
