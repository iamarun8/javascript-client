import { gql } from 'apollo-boost';

const GET_TRAINEE = gql`
query GetTrainee($skip: Int!, $limit:Int!){
  getAllTrainees(payload:{skip:$skip, limit:$limit}){
    message
    totalCount
    count
    data{
      _id
    	name
    	email
    	password
    	originalId
    	createdAt
    }

  }
}`;
export { GET_TRAINEE };