import { useAppStore } from '../provider/store-provider';

export interface UseNavDrawerActionsReturn {
  open: () => void;
}

export function useNavDrawerActions() {
  const open = useAppStore((state) => state.openNavDrawer);

  return { open };
}

export interface UseNavDrawerReturn extends UseNavDrawerActionsReturn {
  isOpen: boolean;
}

export function useNavDrawer(): UseNavDrawerReturn {
  const isOpen = useAppStore((state) => state.isNavDrawerOpen);
  const actions = useNavDrawerActions();

  return { isOpen, ...actions };
}
