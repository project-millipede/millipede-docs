declare module "*.md" {
  const content: any;
  export default content;
}

declare module "*.mdx" {
  const code: any;
  const meta: any;
  const ast: any;
  const headingsMap: any;
  const raw: any;
  export { code, meta, ast, headingsMap, raw };
}
