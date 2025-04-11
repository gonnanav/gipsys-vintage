import { useAppStore } from '../provider/store-provider';

export interface UseCartDrawerActionsReturn {
  open: () => void;
  close: () => void;
}

export function useCartDrawerActions(): UseCartDrawerActionsReturn {
  const open = useAppStore((state) => state.openCartDrawer);
  const close = useAppStore((state) => state.closeCartDrawer);

  return { open, close };
}

export interface UseCartDrawerReturn extends UseCartDrawerActionsReturn {
  isOpen: boolean;
}

export function useCartDrawer(): UseCartDrawerReturn {
  const isOpen = useAppStore((state) => state.isCartDrawerOpen);
  const actions = useCartDrawerActions();

  return { isOpen, ...actions };
}
