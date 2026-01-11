import type { Components } from '@mui/material/styles'
import { colors } from '../colors'

export const MuiFormLabel: Components['MuiFormLabel'] = {
    styleOverrides: {
        root: {
            fontSize: '0.875rem',
            fontWeight: 500,
            color: colors.gray[700],
            transform: 'none',
            position: 'static',
            marginBottom: '8px',
            '&.Mui-focused': {
                color: colors.gray[700],
            },
        },
    },
}

export const MuiRadio: Components['MuiRadio'] = {
    styleOverrides: {
        root: {
            color: colors.gray[400],
            '&.Mui-checked': {
                color: '#E91D74',
            },
        },
    },
}

export const MuiFormControlLabel: Components['MuiFormControlLabel'] = {
    styleOverrides: {
        label: {
            fontSize: '0.875rem',
            fontWeight: 400,
            color: colors.neutral[700],
        },
    },
}
