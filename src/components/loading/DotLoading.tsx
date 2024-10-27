import type { SVGProps } from 'react';

interface DotLoadingProps extends SVGProps<SVGSVGElement> {
  size?: number;
  fill?: string;
}

export const DotLoading = ({ size = 24, ...props }: DotLoadingProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      {...props}>
      <circle cx={4} cy={12} r={3} fill={props.fill ?? 'black'}>
        <animate
          id="svgSpinners3DotsFade0"
          fill="freeze"
          attributeName="opacity"
          begin="0;svgSpinners3DotsFade1.end-0.325s"
          dur="0.975s"
          values="1;0.2" />
      </circle>
      <circle cx={12} cy={12} r={3} fill={props.fill ?? 'black'} opacity={0.4}>
        <animate
          fill="freeze"
          attributeName="opacity"
          begin="svgSpinners3DotsFade0.begin+0.195s"
          dur="0.975s"
          values="1;0.2" />
      </circle>
      <circle cx={20} cy={12} r={3} fill={props.fill ?? 'black'} opacity={0.3}>
        <animate
          id="svgSpinners3DotsFade1"
          fill="freeze"
          attributeName="opacity"
          begin="svgSpinners3DotsFade0.begin+0.39s"
          dur="0.975s"
          values="1;0.2" />
      </circle>
    </svg>
  );
};
