import {gql} from '@apollo/client';

export const GET_USER_BY_ID = gql`
  query getUserById($getUserByIdId: ID!) {
    getUserById(id: $getUserByIdId) {
      id
      saved_tags
    }
  }
`;

export const GET_USERS = gql`
  query getAllUsers {
    getAllUsers {
      course_type
      first_name
      github
      last_name
      user_photo
      user_permission
      id
    }
  }
`;
