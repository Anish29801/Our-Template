import { GraphqlQueryError } from "@shopify/shopify-api";
import shopify from "./shopify.js";

export default async function writemetadata(session, name_metafield, Data) {
    const client = new shopify.api.clients.Graphql({ session });

    const CHECK_QUERY = `
    {
        currentAppInstallation {
        id,
        activeSubscriptions {
        status
        }
    }
    }`

    const app_meta_data_mutation = `
                mutation CreateAppDataMetafield($metafieldsSetInput: [MetafieldsSetInput!]!) {
                    metafieldsSet(metafields: $metafieldsSetInput) {
                        metafields {
                            id
                            namespace
                            key
                        }
                        userErrors {
                            field
                            message
                        }
                    }
                }`;
    try {
        const data = await client.query({
            data: {
                "query": CHECK_QUERY,
                "variables": {}
            }
        });

        console.log(`Data ----------------------------------`+ JSON.stringify(Data));
        const meta_data = await client.query({

            data: {
                "query": app_meta_data_mutation,
                "variables": {
                    "metafieldsSetInput": [
                        {
                            "namespace": `${name_metafield}`,
                            "key": `${name_metafield}`,
                            "type": "json",
                            "value": `${JSON.stringify(Data)}`,
                            "ownerId": data.body.data.currentAppInstallation.id
                        }
                    ]
                }
            }



        });
        console.log(JSON.stringify(meta_data));
    }
    catch (error) {
        if (error instanceof GraphqlQueryError) {
            throw new Error(
                `${error.message}\n${JSON.stringify(error.response, null, 2)}`
            );
        } else {
            throw error;
        }
    }
}