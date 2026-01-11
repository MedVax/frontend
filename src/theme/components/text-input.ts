import type { Components, Theme } from '@mui/material'
import { colors } from '../colors'

export const MuiTextField: Components<Theme>['MuiTextField'] = {
    styleOverrides: {
        root: {
            '& .MuiFormHelperText-root': {
                margin: 0,
                marginTop: '2px',
                fontSize: '12px',
                color: colors.red[500],
            },
            '& .MuiOutlinedInput-root': {
                backgroundColor: colors.base.white,
            },
        },
    },
    variants: [
        {
            props: { variant: 'outlined' },
            style: {
                '& .MuiOutlinedInput-root': {
                    color: colors.neutral[900],
                    fontSize: '1rem',
                    fontWeight: 400,
                    borderRadius: '12px',
                    padding: '12px 16px',
                    height: '100%',
                    boxSizing: 'border-box',
                    display: 'flex',
                    backgroundColor: colors.base.white,
                    '& fieldset': {
                        borderColor: colors.gray[200],
                    },
                    '&:hover fieldset': {
                        borderColor: colors.gray[300],
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#E91D74',
                        borderWidth: '1.5px',
                    },
                    '& legend': {
                        width: 0,
                    },
                    '& .MuiOutlinedInput-notchedOutline legend': {
                        width: 0,
                    },
                },
            },
        },
        {
            props: { variant: 'outlined', size: 'small' },
            style: {
                '& .MuiOutlinedInput-root': {
                    height: '36px',
                    padding: '8px 12px',
                },
            },
        },
        {
            props: { variant: 'outlined', size: 'medium' },
            style: {
                '& .MuiOutlinedInput-root': {
                    height: '48px',
                    padding: '12px 16px',
                },
            },
        },
    ],
}

export const MuiInputLabel: Components<Theme>['MuiInputLabel'] = {
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

export const MuiOutlinedInput: Components<Theme>['MuiOutlinedInput'] = {
    styleOverrides: {
        notchedOutline: {
            '& legend': {
                width: 0,
            },
        },
        root: {
            fontSize: '1rem',
            borderRadius: '12px',
            '& legend': {
                width: 0,
            },
        },
    },
}
