import TracePage from "@/components/tracer/TracePage";
import TracerStoreProvider from "@/stores/TracerStore";

export default function TraceModal() {
  return (
    <TracerStoreProvider>
      <TracePage />
    </TracerStoreProvider>
  );
}
