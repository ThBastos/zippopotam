import { gql } from 'apollo-server';
import { IResolvers } from '@graphql-tools/utils';
import { makeExecutableSchema } from '@graphql-tools/schema';

const typeDefs = gql`

  type Places {
    placeName: String
    longitude: String,
    state: String,
    stateAbbreviation: String,
    latitude: String
  }

  type ZipCodeResponse {
    postCode: String
    country: String
    countryAbbreviation: String 
    places: [Places]
  }

  type Query {
    getZipCodeInfos(country: String!, zipCode: String! ): ZipCodeResponse
  }

`;

const resolvers: IResolvers = {
  Query: {
    getZipCodeInfos: (_, { country, zipCode }, { dataSources }) => {
      return dataSources.zipCodeAPI.withCountryAndZipCode(country, zipCode)
    },
  },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})
