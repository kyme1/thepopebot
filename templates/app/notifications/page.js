import { auth } from 'open-ohcode/auth';
import { NotificationsPage } from 'open-ohcode/chat';

export default async function NotificationsRoute() {
  const session = await auth();
  return <NotificationsPage session={session} />;
}
