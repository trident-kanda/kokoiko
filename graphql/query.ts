import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.GRAPHQL_URL,
  cache: new InMemoryCache(),
});

type postProps = {
  data: {
    date: string;
    detailPlace: string;
    numberPeople: string;
    overview: string;
    time: string;
    title: string;
  };
  latLng: {
    lat: number;
    lng: number;
  };
};

export const post = async ({ data, latLng }: postProps) => {
  console.log(data);
  console.log(latLng);
};

export const setUserData = async (id:string,name:string) => {    
}