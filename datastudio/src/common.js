// @flow strict

export function cssPxToInteger(cssVariable: string): number {
  return parseInt(cssVariable.replace(/px$/, ""), 10);
}
