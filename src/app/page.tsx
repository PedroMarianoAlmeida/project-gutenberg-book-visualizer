import { HomePageClient } from "./HomePageClient";
import { getBookIdsAlreadyRegistered } from "@/services/dbService";

export default async function Home() {
  const bookIds = await getBookIdsAlreadyRegistered();

  return <HomePageClient ids={bookIds.success ? bookIds.result.ids : null} />;
}
