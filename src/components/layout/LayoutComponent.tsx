import Header from "./Header";
import Footer from "./Footer";

export default function LayoutComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        border: "1px solid red",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Header />
      {children}
      <Footer />
    </div>
  );
}
