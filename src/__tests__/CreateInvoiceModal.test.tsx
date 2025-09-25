import { render, screen } from "@testing-library/react";
import CreateInvoiceModal from "../components/CreateInvoiceModal";
import "@testing-library/jest-dom";

test("renders invoice modal", () => {
  render(
    <CreateInvoiceModal
      isOpen={true}
      onClose={() => {}}
      onSubmit={async () => {}}
    />
  );

  expect(screen.getByText("Create New Invoice")).toBeInTheDocument();
});
