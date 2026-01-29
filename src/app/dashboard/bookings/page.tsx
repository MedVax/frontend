"use client";

import React from 'react'
import { useAuth } from '@/hooks/use-auth'
import ClientBookings from '../(client)/features/ClientBookings'
import ConsultantBookings from '../(consultant)/features/ConsultantBookings'

const BookingPage = () => {
    const auth = useAuth();
    return (
        <div>
            {auth.isClient && <ClientBookings />}
            {auth.isConsultant && <ConsultantBookings />}
        </div>
    );
};

export default BookingPage;