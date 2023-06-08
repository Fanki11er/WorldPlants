export const theme: Theme = {
  colors: {
    mainBlue: "rgba(4, 17, 45, 1)",
    darkBlue: "rgba(4, 16, 41, 1)",
    navyBlue: "rgba(7, 29, 83, 1)",
    gradientPurple: "linear-gradient(rgba(40, 41, 123, 1), rgba(49, 32, 97, 1))",
    orange: "rgba(254, 122, 53, 1)",
    green: "rgba(59, 214, 166, 1)",
    white: "rgba(255, 255, 255, 1)",
    purple: "rgba(49, 32, 97, 1)",
    blue: "rgba(17, 84, 230, 1)",
    gray: "rgba(88, 94, 114, 1)",
   
  },
  fontSizes: {
    small: "14px",
  },

  /*devices: {
    small: `min-width: 600px`,
    medium: `min-width: 800px`,
    large: `min-width: 1440px`,
    veryLarge: "min-width: 2500px",
  },*/

  fontFamilies: {
    Roboto: "Roboto, sans-serif",
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
  };
  fontSizes: {
    small: string;
  };

  /*devices: {
    small: string;
    medium: string;
    large: string;
    veryLarge: string;
  };*/

  fontFamilies: {
    Roboto: string;
  };
};

export type AppTheme = {
  theme: Theme;
};
