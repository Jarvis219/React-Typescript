import { Header } from "features/client/components/Header/Header";
import { Banner } from "features/client/components/Banner/Banner";
import Store from "features/client/components/Store/Store";

export default function Home() {
  return (
    <div>
      <Header />
      <Banner />
      <Store />
    </div>
  );
}
