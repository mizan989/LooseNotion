import { getCurrentUser } from "@/lib/server/auth";
import { LandingView } from "@/components/landing/LandingView";

export default async function LandingPage() {
  const user = await getCurrentUser();
  return <LandingView user={user} />;
}