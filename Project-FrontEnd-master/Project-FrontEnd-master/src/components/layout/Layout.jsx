import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />

      <div className="flex max-w-[calc(100%_-_3rem)] flex-1 flex-col">
        <Header />

        <div className="flex flex-1 flex-col overflow-auto p-4">{children}</div>
      </div>
    </div>
  );
};
export default Layout;
