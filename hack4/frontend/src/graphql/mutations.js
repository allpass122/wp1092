import { gql } from "@apollo/client";

export const MUTATION = gql`
  mutation (
    $ssn: String!
    $name: String!
    $severity: Int!
    $location_name: String!
    $location_des: String!
  ) {
    insertPeople(
      data: {
        ssn: $ssn
        name: $name
        severity: $severity
        location: { name: $location_name, description: $location_des }
      }
    )
  }
`;
