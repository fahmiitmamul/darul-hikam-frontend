import AppHeader from "@/components/app-header";
import Sidebar from "@/components/sidebar-wrapper";

export default function BukuPelajaran() {
  return (
    <Sidebar>
      <div className="flex flex-col w-full">
        {/* Header */}
        <div className="w-full">
          <AppHeader />
        </div>
      </div>
    </Sidebar>
  );
}
