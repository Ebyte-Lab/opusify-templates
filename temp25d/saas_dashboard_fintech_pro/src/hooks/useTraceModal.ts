import { useStore } from './useStore';

export function useTraceModal() {
  const isOpen = useStore((state) => state.isTraceModalOpen);
  const transaction = useStore((state) => state.traceTransaction);
  const open = useStore((state) => state.openTraceModal);
  const close = useStore((state) => state.closeTraceModal);

  return {
    isOpen,
    transaction,
    open,
    close,
  };
}
