import { colors } from './colors'

const palette = {
    primary: {
        light: '#F472B6',
        lighter: '#FEF1F8',
        main: '#E91D74',
        dark: '#BE185D',
        contrastText: colors.base.white,
    },
    secondary: {
        light: colors.gray[300],
        main: colors.gray[500],
        dark: colors.gray[700],
        contrastText: colors.base.black,
    },
    error: {
        main: colors.red[500],
    },
    warning: {
        main: colors.orange[500],
    },
    info: {
        main: colors.cyan[500],
    },
    success: {
        main: colors.green[500],
    },
    text: {
        primary: colors.gray[950],
        secondary: colors.gray[600],
    },
    background: {
        default: colors.base.white,
        paper: colors.base.white,
    },
    ...colors,
}

export default palette
