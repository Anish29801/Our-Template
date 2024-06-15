import { GraphqlQueryError } from "@shopify/shopify-api";
import shopify from "./shopify.js";
import queryRunner from "./query1.js";
import queryRunner3 from "./query3.js";

const QUERY = `mutation addCustomItemToOrder($id: ID!) {
  orderEditAddCustomItem(id: $id, title: "Cash On Delivery Fee", quantity: 1, price: {amount: 20.00, currencyCode: INR}) {
    calculatedOrder {
      id
      addedLineItems(first: 5) {
        edges {
          node {
            id
          }
        }
      }
    }
    userErrors {
      field
      message
    }
  }
}`;



export default async function queryRunner2(session, payload) {
  console.log(`queryRunner2 Started ------ ${session}`);

  try {
    const client = new shopify.api.clients.Graphql({ session });

    let calculatedOrderObj = '';
    await queryRunner(session,payload).then((value) => {
      console.log("Value=========", value);
      calculatedOrderObj = value;
    });

    console.log("Calculated order===================", calculatedOrderObj);

    const response = await client.query({
      data: {
        query: QUERY,
        variables: { id: calculatedOrderObj },
      },
    });

    const formattedData = JSON.stringify(response, null, 2);
    console.log(`Response from Query Runner -----------------> ${formattedData}`);
    queryRunner3(session, calculatedOrderObj)
  } catch (error) {
    if (error instanceof GraphqlQueryError) {
      throw new Error(`${error.message}\n${JSON.stringify(error.response, null, 2)}`);
    } else {
      throw error;
    }
  }
}