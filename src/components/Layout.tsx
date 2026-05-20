import { Navbar } from './Navbar';
import { Outlet } from 'react-router';
import { Footer } from '../app/components/content-sections';

export function Layout() {
  return (
    <div className="w-full min-h-screen bg-white" style={{ scrollBehavior: "smooth" }}>
      <Navbar />
      <main className="w-full pb-16 pt-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
