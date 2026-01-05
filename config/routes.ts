export const ROUTES = {
    HOME: '/',

    // Auth
    LOGIN: '/login',
    SIGNUP: '/signup',

    // Products
    PRODUCTS: '/products',
    PRODUCT_DETAIL: (id: number) => `/products/${id}`,

    // Cart & Checkout
    CART: '/cart',
    CHECKOUT: '/checkout',

    // Orders
    ORDERS: '/orders',
    ORDER_DETAIL: (id: number) => `/orders/${id}`,

    // Consultations
    CONSULTATIONS: '/consultations',
    CONSULTATION_DETAIL: (id: number) => `/consultations/${id}`,
    REQUEST_CONSULTATION: '/consultations/request',

    // Prescriptions
    PRESCRIPTIONS: '/prescriptions',
    UPLOAD_PRESCRIPTION: '/prescriptions/upload',

    // Admin
    ADMIN: '/admin',
    ADMIN_PRODUCTS: '/admin/products',
    ADMIN_ORDERS: '/admin/orders',
    ADMIN_CONSULTATIONS: '/admin/consultations',
    ADMIN_ANALYTICS: '/admin/analytics',
} as const;
