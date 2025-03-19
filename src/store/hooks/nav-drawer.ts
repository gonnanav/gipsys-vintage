import { useAppStore } from '../provider/store-provider';

export interface UseNavDrawerActionsReturn {
  open: () => void;
  close: () => void;
}

export function useNavDrawerActions() {
  const open = useAppStore((state) => state.openNavDrawer);
  const close = useAppStore((state) => state.closeNavDrawer);

  return { open, close };
}

export interface UseNavDrawerReturn extends UseNavDrawerActionsReturn {
  isOpen: boolean;
}

export function useNavDrawer(): UseNavDrawerReturn {
  const isOpen = useAppStore((state) => state.isNavDrawerOpen);
  const actions = useNavDrawerActions();

  return { isOpen, ...actions };
}
