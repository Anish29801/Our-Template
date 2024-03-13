import {
  Page,
  Layout,
} from "@shopify/polaris";


import { ProductsCard } from "../components";

export default function HomePage() {
  return (
    <Page>
      <Layout>
        <Layout.Section>
          <ProductsCard />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
