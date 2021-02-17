import { gql } from 'apollo-boost';

const CREATE_TRAINEE = gql`
mutation CreateTrainee($name: String!, $email: String!, $password: String!) {
    createTrainee(user: { name: $name, email: $email, password: $password, role: "trainee"})
    {
      name
      email
    }
}
`;

const UPDATE_TRAINEE = gql`
mutation UpdateTrainee($id: ID! $name: String, $email: String) {
    updateTrainee(User: { id: $id, dataToUpdate:{name: $name, email: $email} })
    {
      name
      email
    }
}
`;

const DELETE_TRAINEE = gql`
mutation DeleteTrainee($originalId: ID!) {
    deleteTrainee(originalId: $originalId)
}
`;

export { CREATE_TRAINEE, UPDATE_TRAINEE, DELETE_TRAINEE };