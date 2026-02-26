import { auth } from 'open-ohcode/auth';
import { ChatsPage } from 'open-ohcode/chat';

export default async function ChatsRoute() {
  const session = await auth();
  return <ChatsPage session={session} />;
}
