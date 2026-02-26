import { auth } from 'open-ohcode/auth';
import { ChatPage } from 'open-ohcode/chat';

export default async function ChatRoute({ params }) {
  const { chatId } = await params;
  const session = await auth();
  return <ChatPage session={session} needsSetup={false} chatId={chatId} />;
}
