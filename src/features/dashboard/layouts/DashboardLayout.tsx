import Sidebar from "../components/Sidebar";

function DashboardLayout() {
  return (
    <div className="flex gap-0 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col gap-y-20 items-center bg-gray-400">
        <div>
          <header>
            <h1>Dashboard</h1>
          </header>
        </div>
        <main>
          <p>Welcome to the Dashboard!</p>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
