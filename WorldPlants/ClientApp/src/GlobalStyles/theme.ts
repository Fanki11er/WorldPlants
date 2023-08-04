export const theme: Theme = {
  colors: {
    mainBlue: "rgba(4, 17, 45, 1)",
    darkBlue: "rgba(4, 16, 41, 1)",
    navyBlue: "rgba(7, 29, 83, 1)",
    gradientPurple: "linear-gradient(137deg, #28297B 0%, #312061 100%)",
    orange: "rgba(254, 122, 53, 1)",
    green: "rgba(59, 214, 166, 1)",
    white: "rgba(255, 255, 255, 1)",
    purple: "rgba(49, 32, 97, 1)",
    blue: "rgba(17, 84, 230, 1)",
    gray: "rgba(88, 94, 114, 1)",
    purpleLight: "rgba(78, 78, 165, 1)",
    yellow: "rgba(255, 198, 67,1)",
    turquoise: "rgba(31, 204, 151, 1)",
    red: "rgba(217,20,36, 0.9)",
    pink: "rgba(255, 185, 185, 1)",
   // pink: "rgba(246,149, 125, 1)",
   //pink: "rgba(238, 104, 74, 1)"
   greenSettings: "rgba(44, 149, 34, 1)",
   darkPurple: "rgba(40, 41, 123, 1)",
   black: "rgba(0, 0, 0, 1)",
  },
  fontSizes: {
    small: "14px",
    medium:"16px",
    large: "20px",
  },

  /*devices: {
    small: `min-width: 600px`,
    medium: `min-width: 800px`,
    large: `min-width: 1440px`,
    veryLarge: "min-width: 2500px",
  },*/

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
  };

  fontSizes: {
    small: string;
    medium: string;
    large: string;
  };

  /*devices: {
    small: string;
    medium: string;
    large: string;
    veryLarge: string;
  };*/

  fontFamilies: {
    Roboto: string;
    Inter: string;
  };
};

export type AppTheme = {
  theme: Theme;
};
