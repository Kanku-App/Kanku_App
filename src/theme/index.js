import {adjust} from '../utils/adjust';

const Theme = {
  FONT_SIZE_EXTRA_EXTRA_SMALL: adjust(10),
  FONT_SIZE_EXTRA_SMALL: adjust(12),
  FONT_SIZE_SMALL: adjust(14),
  FONT_SIZE_REGULAR: adjust(15),
  FONT_SIZE_MEDIUM: adjust(16),
  FONT_SIZE_SEMI_MEDIUM: adjust(18),
  FONT_SIZE_LARGE: adjust(20),
  FONT_SIZE_EXTRA_LARGE: adjust(24),
  FONT_SIZE_EXTRA_EXTRA_LARGE: adjust(32),
  FONT_WEIGHT_LIGHT: '200',
  FONT_WEIGHT_MEDIUM: '500',
  FONT_WEIGHT_BOLD: '700',

  TEXT_COLOR_PRIMARY: 'rgba(0,0,0,0.85)',
  TEXT_COLOR_SECONDARY: 'rgba(0,0,0,0.45)',
  BORDER_COLOR: '#EAEAEA',
  BUTTON_PRIMARY_COLOR: '#2F4858',
  BUTTON_SECONDARY_COLOR: 'rgba(0,0,0,0.45)',
  BUTTON_DANGER_COLOR: 'rgb(227, 17, 108)',
  BACKGROUND_COLOR_LIGHT: '#f0f6f7',
  PRIMARY_COLOR: '#59BFAC',

  // FONT_FAMILY_SEMIBOLD: 'NauticaRounded-SemiBold',
  // FONT_FAMILY_REGULAR: 'NauticaRounded-SemiBold',
  // FONT_FAMILY_BOLD: 'NauticaRounded-Bold',
  // FONT_FAMILY_MEDIUM: 'NauticaRounded-SemiBold',

  FONT_FAMILY_SEMIBOLD: 'sf-pro-text-semibold',
  FONT_FAMILY_REGULAR: 'sf-pro-text-regular',
  FONT_FAMILY_BOLD: 'sf-pro-text-bold',
  FONT_FAMILY_MEDIUM: 'sf-pro-text-medium',
};
export default Theme;
