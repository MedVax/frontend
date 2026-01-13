import type { Components, Theme } from '@mui/material'
import { colors } from '../colors'

export const MuiCard: Components<Theme>['MuiCard'] = {
    styleOverrides: {
        root: {
            borderRadius: '24px',
            boxShadow: 'none',
            backgroundColor: colors.gray[50],
            border: '1px solid',
            borderColor: colors.gray[200],
            padding: 4
        },
    },
}

export const MuiCardContent: Components<Theme>['MuiCardContent'] = {
    styleOverrides: {
        root: {
            padding: 4,
            // '&:last-child': {
            //     paddingBottom: '24px',
            // },
        },
    },
}
