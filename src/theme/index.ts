import { createTheme } from '@mui/material/styles'
import palette from './palette'
import typography from './typography'
import spacing from './spacing'
import { borderRadius } from './border'
import { shadows } from './shadows'
import { backdropBlur } from './effects'
import { opacity } from './opacity'
import { components } from './components'

export const theme = createTheme({
    palette,
    typography,
    spacing: (factor: number) => spacing[factor] || spacing[0],
    shape: {
        borderRadius: borderRadius.default,
    },
    custom: {
        backdropBlur,
        opacity,
    },
    shadows,
    components,
})

export { colors } from './colors'
export { default as palette } from './palette'
export { default as typography } from './typography'
export { borderRadius } from './border'
export { shadows } from './shadows'
export { backdropBlur } from './effects'
export { opacity } from './opacity'
