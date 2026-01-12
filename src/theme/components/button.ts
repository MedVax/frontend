import type { Components, Theme } from '@mui/material'
import { colors } from '../colors'

export const MuiButton: Components<Theme>['MuiButton'] = {
    styleOverrides: {
        root: {
            borderRadius: '84px',
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '1rem',
            height: '48px',
            boxShadow: 'none',
            '&:hover': {
                boxShadow: 'none',
            },
            '&.Mui-disabled': {
                backgroundColor: colors.gray[300],
                color: colors.gray[500],
            },
        },
    },
    variants: [
        {
            props: { variant: 'contained', color: 'primary' },
            style: {
                backgroundColor: '#E91D74',
                color: colors.base.white,
                '&:hover': {
                    backgroundColor: '#BE185D',
                },
            },
        },
        {
            props: { variant: 'outlined', color: 'primary' },
            style: {
                backgroundColor: colors.base.white,
                borderColor: '#E91D74',
                color: '#E91D74',
                '&:hover': {
                    backgroundColor: '#FDF2F8',
                    borderColor: '#BE185D',
                },
            },
        },
        {
            props: { variant: 'text' },
            style: {
                backgroundColor: colors.base.transparent,
                color: colors.gray[950],
                '&:hover': {
                    backgroundColor: colors.gray[100],
                },
            },
        },
        {
            props: { variant: 'ghost' },
            style: {
                backgroundColor: colors.neutral[300],
                color: colors.gray[950],
                '&:hover': {
                    backgroundColor: colors.neutral[400],
                },
            },
        },
    ],
}
