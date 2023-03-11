export const theme: Theme = {
  colors: {},
  fontSizes: {},

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
  colors: {};
  fontSizes: {};

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
