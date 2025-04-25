import Sidebar from "@/components/sidebar-wrapper";
import AppHeader from "@/components/app-header";

export default function Profil() {
  return (
    <Sidebar>
      <div className="flex flex-col w-full">
        {/* Header */}
        <div className="w-full">
          <AppHeader />
        </div>

        {/* Content */}
      </div>
    </Sidebar>
  );
}
