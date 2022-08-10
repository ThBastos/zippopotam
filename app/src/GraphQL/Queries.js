import { gql } from '@apollo/client'

export const SEARCH_ZIP = gql`
  query ($country: String!, $zipCode: String!) {
    getZipCodeInfos(country: $country, zipCode: $zipCode){
      postCode
      country
      countryAbbreviation
      places {
        placeName
        longitude
        state
        stateAbbreviation
        latitude
      }
    }
  }
`;
