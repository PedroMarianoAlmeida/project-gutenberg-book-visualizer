import { HomePageClient } from "./HomePageClient";
import { getBookIdsAlreadyRegistered } from "@/services/dbService";

export const dynamic = "force-dynamic";
export default async function Home() {
  const bookIds = await getBookIdsAlreadyRegistered();

  return (
    <HomePageClient
      ids={
        bookIds.success
          ? bookIds.result.ids.sort((a, b) => Number(a) - Number(b))
          : null
      }
    />
  );
}
