import { gql } from "@apollo/client";

export const QUERY = gql`
  query ($severity: Int, $locationKeywords: String) {
    persons(severity: $severity, locationKeywords: $locationKeywords) {
      ssn
      name
      severity
      location {
        name
        description
      }
    }
  }
`;
