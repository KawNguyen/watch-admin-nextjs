import type { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4 dark:from-slate-900 dark:to-slate-800">
      <div className="w-full max-w-md">
        {children}
        <div className="mt-6 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Admin Dashboard. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Layout;
