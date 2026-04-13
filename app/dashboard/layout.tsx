import { Sidebar } from '@/components/dashboard/sidebar';
import { MobileMenuProvider } from '@/components/dashboard/mobile-menu';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MobileMenuProvider>
      <div className="min-h-screen overflow-x-hidden bg-[#F2F1ED] p-3 lg:p-4">
        <Sidebar />
        <div className="min-w-0 lg:ml-[252px]">{children}</div>
      </div>
    </MobileMenuProvider>
  );
}
