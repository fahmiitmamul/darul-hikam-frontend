import Sidebar from "@/components/sidebar-wrapper";

export default function Profil() {
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
