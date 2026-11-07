// React hoists these stylesheets to <head> in this exact cascade order.
// Full-page navigation keeps each route's original stylesheet set isolated.
export function PageStyles({ files }: { files: readonly string[] }) {
  return (
    <>
      {files.map((href) => (
        <link key={href} rel="stylesheet" href={href} precedence="site" />
      ))}
    </>
  );
}
