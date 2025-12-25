import { AuthProvider } from './userAuthContext';
import { LocationProvider } from './userLocationContext';

const providers = [LocationProvider, AuthProvider];
export function GlobalProviders({ children }: any) {
  return providers.reduce((acc, Provider) => <Provider>{acc}</Provider>, children);
}
