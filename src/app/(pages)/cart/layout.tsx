import { EnsureAuthenticated } from "@/components/common/EnsureAuthenticated";

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <EnsureAuthenticated>{children}</EnsureAuthenticated>
    </>
  );
}
