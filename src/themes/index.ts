import colors from './colors';
import fontSizes from './fontSizes';
import letterSpacings from './letterSpacings';
import lineHeights from './lineHeights';
import space from './space';

// eslint-disable-next-line import/prefer-default-export
export const theme = {
  space,
  fontSizes,
  letterSpacings,
  lineHeights,
  colors,
} as const;
