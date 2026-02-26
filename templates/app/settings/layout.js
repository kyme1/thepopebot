import { auth } from 'open-ohcode/auth';
import { SettingsLayout } from 'open-ohcode/chat';

export default async function Layout({ children }) {
  const session = await auth();
  return <SettingsLayout session={session}>{children}</SettingsLayout>;
}
