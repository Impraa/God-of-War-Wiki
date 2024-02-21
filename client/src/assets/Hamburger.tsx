import * as React from "react";
import { SVGProps, memo } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={57}
    height={34}
    fill="none"
    {...props}
  >
    <path
      stroke="#E34F4F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={5.6}
      d="M3 31h50.4M3 17h50.4M3 3h50.4"
    />
  </svg>
);
const Memo = memo(SvgComponent);
export default Memo;
