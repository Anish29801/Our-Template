import { GraphqlQueryError } from "@shopify/shopify-api";
import shopify from "./shopify.js";

export default async function readmetadata(session, meta_field_name) {
    const client = new shopify.api.clients.Graphql({ session });
    try{
        const data = await client.query({
        data: {
            "query": `
            query {
                currentAppInstallation {
                  metafield(namespace: "${meta_field_name}", key: "${meta_field_name}") {
                    value
                  }
                }
              }
            `,
            "variables": {}
            
        }
        }); 
        console.log(`READ Data ----------------------------------------------> ${JSON.stringify(data)}`);
        if(data.body.data.currentAppInstallation && data.body.data.currentAppInstallation.metafield && data.body.data.currentAppInstallation.metafield.value){
            return data.body.data.currentAppInstallation.metafield.value;
        }
        return false;      
    }catch (error) {
        if (error instanceof GraphqlQueryError) {
          throw new Error(
            `${error.message}\n${JSON.stringify(error.response, null, 2)}`
          );
      } else {
        throw error;
    }
  }
}