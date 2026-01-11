import type { Components, Theme } from '@mui/material'
import { colors } from '../colors'

export const MuiTab: Components<Theme>['MuiTab'] = {
    defaultProps: {
        variant: 'standard',
    },
    styleOverrides: {
        root: {
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '0.875rem',
            color: colors.gray[500],
            minHeight: '40px',
            padding: '8px 16px',
            '&.Mui-selected': {
                color: '#E91D74',
            },
        },
    },
    variants: [
        {
            props: { variant: 'filled' },
            style: {
                borderRadius: '8px',
                backgroundColor: colors.base.white,
                color: colors.gray[500],
                minHeight: '40px',
                '&.Mui-selected': {
                    backgroundColor: '#E91D74',
                    color: colors.base.white,
                },
            },
        },
        {
            props: { variant: 'standard' },
            style: {
                backgroundColor: colors.base.transparent,
                color: colors.gray[500],
                minHeight: '40px',
                border: 'none',
                '&.Mui-selected': {
                    color: '#E91D74',
                    borderBottom: '2px solid #E91D74',
                },
            },
        },
    ],
}

export const MuiTabs: Components<Theme>['MuiTabs'] = {
    styleOverrides: {
        indicator: {
            display: 'none',
        },
        flexContainer: {
            gap: '8px',
        },
    },
}
