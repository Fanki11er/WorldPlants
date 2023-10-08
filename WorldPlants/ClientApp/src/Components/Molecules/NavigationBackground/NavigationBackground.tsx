import { NavigationBackgroundSvg } from "./NavigationBackground.styles";

const NavigationBackground = () => {
  return (
    <NavigationBackgroundSvg
      width="1440"
      height="129"
      viewBox="0 0 1440 129"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMax slice"
    >
      <path
        d="M0 -1H1440V107C877.646 136.294 562.357 135.57 0 107V-1Z"
        fill="url(#paint0_linear_103_6)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_103_6"
          x1="0"
          y1="-1"
          x2="1440"
          y2="38"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#332F74" />
          <stop offset="1" stopColor="#0A1331" />
        </linearGradient>
      </defs>
    </NavigationBackgroundSvg>
  );
};

export default NavigationBackground;
