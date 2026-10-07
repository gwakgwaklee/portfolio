import { useSyncExternalStore } from 'react';
import { getContent, subscribeContent } from '../services/adminContent';

export default function useAdminContent() {
  return useSyncExternalStore(subscribeContent, getContent);
}
