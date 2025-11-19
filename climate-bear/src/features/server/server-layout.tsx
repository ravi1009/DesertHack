export const ServerLayout = ({ children }: LayoutProps<"/[slug]/[server]">) => {
  return <div className="px-4 py-4">{children}</div>;
};
