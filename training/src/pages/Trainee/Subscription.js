import { gql } from "apollo-boost";

const UPDATED_TRAINEE_SUB = gql`
  subscription {
    traineeUpdated {
      email
      createdAt
      name
      originalId
    }
  }
`;

const DELETED_TRAINEE_SUB = gql`
  subscription {
    traineeDeleted {
      status
      message
      data
    }
  }
`;

export { DELETED_TRAINEE_SUB, UPDATED_TRAINEE_SUB };
