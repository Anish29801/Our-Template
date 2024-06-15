import { GraphqlQueryError } from "@shopify/shopify-api";
import shopify from "./shopify.js";
import fs from "fs";


const QUERY = `mutation beginEdit($id: ID!){
  orderEditBegin(id: $id){
     calculatedOrder{
       id
     }
     userErrors {
      field
      message
    }
   }
 }`;

export default async function queryRunner(session,payload) {
  console.log(`queryRunner1 Started ------ ${JSON.stringify(session)}`);

  try {
    const client = new shopify.api.clients.Graphql({ session });
    const orderid = payload.admin_graphql_api_id;
    console.log("Orderid:", orderid); // Code does not work after this line

    const response = await client.query({
      data: {
        query: QUERY,
        variables: {
          id: orderid
        }
      },
    });

    const formattedData = JSON.stringify(response, null, 2);
    console.log(`Response from Query Runner -----------------> ${formattedData}`);
    
    if (response.body.data.orderEditBegin.calculatedOrder.id) { 
      console.log(`DATA in if ---------------------> ${response.body.data.orderEditBegin.calculatedOrder.id}`);
      return response.body.data.orderEditBegin.calculatedOrder.id;
    }
  } catch (error) {
    if (error instanceof GraphqlQueryError) {
      throw new Error(`${error.message}\n${JSON.stringify(error.response, null, 2)}`);
    } else {
      throw error;
    }
  }
  console.log(`queryRunner1 Started ------ ${JSON.stringify(session)}`);
}