export default function(svg) {
  return `
export default (props) => {
  return ${ svg.replace(/^<svg/, "<svg { ...props } ") };
}
`;
}
