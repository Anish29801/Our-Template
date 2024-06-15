import { GraphqlQueryError } from "@shopify/shopify-api";
import shopify from "./shopify.js";

const QUERY = `
  mutation commitEdit($id:ID!) {
    orderEditCommit(id: $id, notifyCustomer: false, staffNote: "Cash On Delivery App Updated Price") {
      order {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`

export default async function queryRunner3(session,calculatedOrder) {
  console.log(`queryRunner3 Started ------ ${session}`);
    const client = new shopify.api.clients.Graphql({ session });
  ``
    try {
      const response = await client.query({
        data: {
          query: QUERY,
          variables:{id:calculatedOrder}
        },
      });
  
      const formattedData = JSON.stringify(response, null, 2);
      console.log(`COMMIT  from Query Runner -----------------> ${formattedData}`);
    } catch (error) {
      if (error instanceof GraphqlQueryError) {
        throw new Error(`${error.message}\n${JSON.stringify(error.response, null, 2)}`);
      } else {
        throw error;
      }
    }
  }