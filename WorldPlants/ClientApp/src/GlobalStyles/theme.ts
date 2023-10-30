export const theme: Theme = {
  colors: {
    mainBlue: "rgba(4, 17, 45, 1)",
    darkBlue: "rgba(4, 16, 41, 1)",
    navyBlue: "rgba(7, 29, 83, 1)",
    gradientPurple: "linear-gradient(137deg, #28297B 0%, #312061 100%)",
    gradientBlue: "linear-gradient(180deg, #1089EC 0%, #4BC4DB 100%)",
    orangeGradient: "linear-gradient(180deg, #FA5D56 0%, #F4B167 100%)",
    orange: "rgba(254, 122, 53, 1)",
    orangeRed: "rgba(238, 104, 74, 1)",
    green: "rgba(59, 214, 166, 1)",
    white: "rgba(255, 255, 255, 1)",
    purple: "rgba(49, 32, 97, 1)",
    blue: "rgba(17, 84, 230, 1)",
    gray: "rgba(88, 94, 114, 1)",
    purpleLight: "rgba(78, 78, 165, 1)",
    yellow: "rgba(255, 198, 67,1)",
    turquoise: "rgba(31, 204, 151, 1)",
    red: "rgba(217,20,36, 0.9)",
    pink: "rgba(215,178,178,1)",
    greenSettingsActive: "rgba(44, 149, 34, 1)",
    darkPurple: "rgba(40, 41, 123, 1)",
    black: "rgba(0, 0, 0, 1)",
    blackTransparent: "rgba(0, 0, 0, 0.9)",
    transparent: "transparent",
    greenLight: "rgba(173, 230, 212, 1)",
    greenSettings: "rgba(12, 108, 3, 1)",
    lightGray: "rgba(136, 142, 156, 1)",
    claret: "rgba(105, 12, 11, 1)",
    red1: "rgba(210, 24, 24, 1)",
    pink1: "rgba(250, 230, 226, 1)",
  },
  fontSizes: {
    xSmall: "8px",
    verySmall: "10px",
    smallX: "12px",
    small: "14px",
    medium: "16px",
    large: "20px",
    veryLarge: "24px",
    xLarge: "30px",
  },

  devices: {
    small: `max-width: 760px`,
    medium: `max-width: 1200px`,
    //large: `min-width: 1440px`,
    veryLarge: "min-width: 1600px",
  },

  fontFamilies: {
    Roboto: "Roboto, sans-serif",
    Inter: "Inter, sans-serif",
  },
};

export type Theme = {
  colors: {
    mainBlue: string;
    darkBlue: string;
    navyBlue: string;
    gradientPurple: string;
    orange: string;
    green: string;
    white: string;
    purple: string;
    blue: string;
    gray: string;
    purpleLight: string;
    yellow: string;
    turquoise: string;
    pink: string;
    red: string;
    greenSettings: string;
    darkPurple: string;
    black: string;
    transparent: string;
    greenLight: string;
    greenSettingsActive: string;
    lightGray: string;
    gradientBlue: string;
    orangeGradient: string;
    claret: string;
    orangeRed: string;
    pink1: string;
    red1: string;
    blackTransparent: string;
  };

  fontSizes: {
    xSmall: string;
    verySmall: string;
    smallX: string;
    small: string;
    medium: string;
    large: string;
    veryLarge: string;
    xLarge: string;
  };

  devices: {
    small: string;
    medium: string;
    //large: string;
    veryLarge: string;
  };

  fontFamilies: {
    Roboto: string;
    Inter: string;
  };
};

export type AppTheme = {
  theme: Theme;
};
