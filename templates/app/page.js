import { auth } from 'open-ohcode/auth';
import { ChatPage } from 'open-ohcode/chat';

export default async function Home() {
  const session = await auth();
  return <ChatPage session={session} needsSetup={false} />;
}
