import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="w-full max-w-md">
        {children}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Admin Dashboard. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Layout;
