import { Page } from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import { useLoaderData } from "@remix-run/react";
import DashboardTable from "../components/table/DashboardTable";

export const loader = async ({ request, response }) => {
  try {
    const { session, admin } = await authenticate.admin(request);

    const res = await admin.rest.resources.Order.all({
      session: session,
      status: "any",
      fulfillment_status: "shipped",
    });

    return res?.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const DashboardPage = () => {
  const orders = useLoaderData();

  console.log(orders);

  return (
    <Page fullWidth>
      <ui-title-bar title="Dashboard" />

      <div style={{ margin: "0 auto", maxWidth: "100%" }}>
        <DashboardTable orders={orders} />
      </div>
    </Page>
  );
};

export default DashboardPage;
