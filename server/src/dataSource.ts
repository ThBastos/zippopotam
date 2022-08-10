import { RESTDataSource } from "apollo-datasource-rest";
import camelcaseKeys from "camelcase-keys";

const API_URL = "http://api.zippopotam.us/";

export class ZipCodeAPI extends RESTDataSource {
  constructor(){
    super()
    this.baseURL = API_URL
  }

  async withCountryAndZipCode(country: String, zipCode: String){
    const data = await this.get(`${country}/${zipCode}`);
    return camelcaseKeys(data, { deep: true});
  }
}

export const dataSources = () => ({ zipCodeAPI: new ZipCodeAPI() })