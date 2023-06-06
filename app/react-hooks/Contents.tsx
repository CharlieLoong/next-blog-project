export const Contents = ({
  contents,
}): {
  contents: string;
} => {
  let start = performance.now();
  while (performance.now() - start < 1500) {}
  return <pre>{contents}</pre>;
};
