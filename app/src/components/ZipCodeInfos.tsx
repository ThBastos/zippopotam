import React from "react";
import { useQuery } from "@apollo/client";
import { SEARCH_ZIP } from "../GraphQL/Queries";

export const GetZipCode = ({ ICountry, IzipCode, setHistory }: any) => {
  const { data } = useQuery(SEARCH_ZIP, {
    variables: { country: ICountry, zipCode: IzipCode },
  });
  React.useEffect(() => {
    if (data) {
      setHistory((history: any) => [...history, data]);
    }
  }, [data]);
  return (
    <>
      <div>
        {data !== undefined ? (
          <>
            <p>Country: {data.getZipCodeInfos.country}</p>
            <p>
              Country abbreviation: {data.getZipCodeInfos.countryAbbreviation}
            </p>
            <p>State: {data.getZipCodeInfos.places[0].state}</p>
            <p>Place name: {data.getZipCodeInfos.places[0].placeName}</p>
          </>
        ) : (
          "No data found"
        )}
      </div>
    </>
  );
};
