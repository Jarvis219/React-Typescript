import { Header } from "features/client/components/Header/Header";
import { Banner } from "features/client/components/Banner/Banner";
import Store from "features/client/components/Store/Store";
import { Loading } from "utils/loading/Loading";

export default function Home() {
  return (
    <div>
      <Loading />
      <Header />
      <Banner />
      <Store />
    </div>
  );
}
