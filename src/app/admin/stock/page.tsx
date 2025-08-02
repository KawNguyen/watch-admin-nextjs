import { Metadata } from "next";
import StockEntryList from "./_components/stock-entry-list";
export const metadata: Metadata = {
  title: "Admin | Nhập Hàng",
};
export default function Page() {
  return <StockEntryList />;
}
