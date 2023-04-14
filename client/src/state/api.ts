import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { GetkpiResponses, Products, Transactions } from "./types";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: "main",
  tagTypes: ["Kpis", "Products", "Transactions"],
  endpoints: (build) => ({
    getKpis: build.query<Array<GetkpiResponses>, void>({
      query: () => "kpi/kpis",
      providesTags: ["Kpis"],
    }),
    getProducts: build.query<Array<Products>, void>({
      query: () =>"product/products",
      providesTags: ["Products"],
    }),
    getTransaction:build.query <Array<Transactions>, void> ({
        query:()=>"transaction/transactions",
        providesTags:["Transactions"]
    }) 
  }),
});

export const { useGetKpisQuery, useGetProductsQuery, useGetTransactionQuery } = api;
