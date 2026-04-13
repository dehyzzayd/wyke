import { Sidebar } from '@/components/dashboard/sidebar';
import { MobileMenuProvider } from '@/components/dashboard/mobile-menu';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MobileMenuProvider>
      <div className="min-h-screen bg-[#F2F1ED] p-3 lg:p-4">
        <Sidebar />
        <div className="lg:ml-[252px]">{children}</div>
      </div>
    </MobileMenuProvider>
  );
}
