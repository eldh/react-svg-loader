export default function(svg) {
  return `
import React from 'react';

export default (props) => {
  return ${ svg.replace(/^<svg/, "<svg { ...props } ") };
}
`;
}
