import { auth } from 'open-ohcode/auth';
import { SwarmPage } from 'open-ohcode/chat';

export default async function SwarmRoute() {
  const session = await auth();
  return <SwarmPage session={session} />;
}
