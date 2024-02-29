import React from "react";
import {
  IndexTable,
  LegacyCard,
  useBreakpoints,
  useIndexResourceState,
} from "@shopify/polaris";

const DashboardTable = ({ orders }) => {
  const resourceName = {
    singular: "order",
    plural: "orders",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(orders);

  const rowMarkup = orders.map((order, index) => (
    <IndexTable.Row
      id={order?.id}
      key={order?.id}
      selected={selectedResources.includes(order?.id)}
      position={index}
    >
      <IndexTable.Cell>#{order?.order_number}</IndexTable.Cell>
      <IndexTable.Cell>{order?.created_at}</IndexTable.Cell>
      <IndexTable.Cell>{order?.customer?.name}</IndexTable.Cell>
      <IndexTable.Cell>{order?.total_price}</IndexTable.Cell>
      <IndexTable.Cell>{order?.line_items?.length}</IndexTable.Cell>
      <IndexTable.Cell>{order?.financial_status}</IndexTable.Cell>
    </IndexTable.Row>
  ));

  console.log(selectedResources);

  return (
    <LegacyCard>
      <IndexTable
        condensed={useBreakpoints().smDown}
        resourceName={resourceName}
        itemCount={orders.length}
        selectedItemsCount={
          allResourcesSelected ? "All" : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        headings={[
          { title: "Order" },
          { title: "Date" },
          { title: "Customer" },
          { title: "Total" },
          { title: "Items" },
          { title: "Payment Status" },
          { title: "Delivery Status" },
          { title: "Delivery Method" },
        ]}
        pagination={{
          hasNext: true,
          onNext: () => {},
        }}
      >
        {rowMarkup}
      </IndexTable>
    </LegacyCard>
  );
};

export default DashboardTable;
