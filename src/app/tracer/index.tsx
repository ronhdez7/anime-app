import TraceScreen from "@/components/tracer/TraceScreen";
import TracerStoreProvider from "@/stores/TracerStore";

export default function TracePage() {
  return (
    <TracerStoreProvider>
      <TraceScreen />
    </TracerStoreProvider>
  );
}
