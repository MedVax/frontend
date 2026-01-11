import type { Components, Theme } from '@mui/material'
import { colors } from '../colors'

export const MuiCard: Components<Theme>['MuiCard'] = {
    styleOverrides: {
        root: {
            borderRadius: '16px',
            boxShadow: 'none',
            backgroundColor: colors.base.white,
            border: `1px solid ${colors.gray[200]}`,
        },
    },
}

export const MuiCardContent: Components<Theme>['MuiCardContent'] = {
    styleOverrides: {
        root: {
            padding: '24px',
            '&:last-child': {
                paddingBottom: '24px',
            },
        },
    },
}
