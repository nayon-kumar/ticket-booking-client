import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { myEvents } from "@/lib/api/events/data";
import { Suspense } from "react";
import { Spinner } from "@heroui/react";
import DashboardHeading from "@/components/dashboard/DashboardHeading";
import ManageEventClient from "@/components/dashboard/ManageEventClient";

const ManageEvent = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const events = await myEvents(session?.user?.email);

  return (
    <div>
      <DashboardHeading title="Manage Event" description="Manage event" />
      <Suspense fallback={<Spinner />}>
        <ManageEventClient events={events} />
      </Suspense>
    </div>
  );
};

export default ManageEvent;
