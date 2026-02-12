"use client";

import { Box, Typography } from "@mui/material";
import { Shell } from "@/components/ui";

export default function ReturnDeliveryPolicyPage() {
    return (
        <Box className="bg-white min-h-screen w-full">
            <Shell component="section" className="sm:my-20 my-10">
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Header */}
                    <div className="space-y-4">
                        <Typography
                            variant="h3"
                            className="font-bold text-gray-900"
                            component="h1"
                        >
                            MEDVAX HEALTH RETURN & DELIVERY POLICY
                        </Typography>
                        <Typography variant="body1" className="text-gray-700">
                            This Return and Delivery Policy ("Policy") outlines the terms and
                            conditions governing the delivery of products and the return process
                            for orders placed through Medvax Health ("we", "us", "our") platform
                            (www.medvaxhealth.com).
                        </Typography>
                        <Typography variant="body1" className="text-gray-700">
                            By placing an order with Medvax Health, you acknowledge that you have
                            read, understood, and agree to be bound by this Policy. Please review
                            this Policy carefully before making a purchase.
                        </Typography>
                    </div>

                    {/* Delivery Policy Section */}
                    <section className="space-y-4">
                        <Typography variant="h5" className="font-semibold text-gray-900">
                            1. DELIVERY POLICY
                        </Typography>

                        <div className="space-y-3">
                            <Typography variant="h6" className="font-medium text-gray-800">
                                1.1 Delivery Timeframes
                            </Typography>
                            <Typography variant="body1" className="text-gray-700">
                                We strive to deliver your medications and health products as quickly
                                as possible. Delivery timeframes vary based on your location:
                            </Typography>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                <li>
                                    <strong>Same-Day Delivery:</strong> Available in major cities
                                    (Lagos, Abuja, Port Harcourt, Ibadan) for orders placed before
                                    2:00 PM on weekdays. Delivery will be completed by 8:00 PM the
                                    same day.
                                </li>
                                <li>
                                    <strong>Standard Delivery:</strong> 2-5 business days for orders
                                    within major cities and metropolitan areas.
                                </li>
                                <li>
                                    <strong>Extended Delivery:</strong> 5-7 business days for orders
                                    to other locations across Nigeria.
                                </li>
                                <li>
                                    <strong>Prescription Orders:</strong> Delivery may take an
                                    additional 24-48 hours to allow for prescription verification
                                    by our licensed pharmacists.
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <Typography variant="h6" className="font-medium text-gray-800">
                                1.2 Delivery Locations
                            </Typography>
                            <Typography variant="body1" className="text-gray-700">
                                We currently deliver to all major cities and towns across Nigeria.
                                Delivery availability will be confirmed during checkout based on
                                your provided address. If your location is not currently serviced,
                                our customer support team will contact you to discuss alternative
                                delivery arrangements.
                            </Typography>
                        </div>

                        <div className="space-y-3">
                            <Typography variant="h6" className="font-medium text-gray-800">
                                1.3 Delivery Charges
                            </Typography>
                            <Typography variant="body1" className="text-gray-700">
                                Delivery charges are calculated based on your location and order
                                value:
                            </Typography>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                <li>
                                    <strong>Free Delivery:</strong> Available for orders above
                                    ₦10,000 within major cities.
                                </li>
                                <li>
                                    <strong>Standard Delivery Fee:</strong> ₦500 - ₦1,500 depending
                                    on location and order value.
                                </li>
                                <li>
                                    <strong>Express/Same-Day Delivery:</strong> Additional ₦1,000
                                    fee applies.
                                </li>
                            </ul>
                            <Typography variant="body1" className="text-gray-700">
                                Delivery charges will be clearly displayed during checkout before
                                you complete your order.
                            </Typography>
                        </div>

                        <div className="space-y-3">
                            <Typography variant="h6" className="font-medium text-gray-800">
                                1.4 Delivery Process
                            </Typography>
                            <Typography variant="body1" className="text-gray-700">
                                Once your order is confirmed and payment is verified:
                            </Typography>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                <li>
                                    You will receive an order confirmation email with your order
                                    number and estimated delivery date.
                                </li>
                                <li>
                                    When your order is dispatched, you will receive a tracking
                                    number via email and SMS (if provided).
                                </li>
                                <li>
                                    Our delivery partner will contact you on the day of delivery
                                    to confirm your availability and delivery address.
                                </li>
                                <li>
                                    Upon delivery, you may be required to provide identification
                                    and sign for receipt of the order.
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <Typography variant="h6" className="font-medium text-gray-800">
                                1.5 Failed Deliveries
                            </Typography>
                            <Typography variant="body1" className="text-gray-700">
                                If delivery cannot be completed due to:
                            </Typography>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                <li>Incorrect or incomplete address provided</li>
                                <li>Recipient unavailable at the delivery address</li>
                                <li>Inability to contact the recipient</li>
                                <li>Refusal to accept delivery</li>
                            </ul>
                            <Typography variant="body1" className="text-gray-700">
                                We will attempt to contact you to arrange an alternative delivery
                                time. If delivery cannot be completed after three attempts, the
                                order will be returned to our facility and a restocking fee may
                                apply. You will be responsible for any additional delivery charges
                                for re-delivery.
                            </Typography>
                        </div>
                    </section>

                    {/* Return Policy Section */}
                    <section className="space-y-4">
                        <Typography variant="h5" className="font-semibold text-gray-900">
                            2. RETURN POLICY
                        </Typography>

                        <div className="space-y-3">
                            <Typography variant="h6" className="font-medium text-gray-800">
                                2.1 Eligibility for Returns
                            </Typography>
                            <Typography variant="body1" className="text-gray-700">
                                You may return products within 7 days of delivery, provided that:
                            </Typography>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                <li>
                                    The product is unopened, unused, and in its original packaging
                                </li>
                                <li>
                                    The product is not a prescription medication (prescription
                                    medications are non-returnable for safety and regulatory
                                    reasons)
                                </li>
                                <li>
                                    The product is not a perishable item or item with a short
                                    expiration date
                                </li>
                                <li>
                                    The product was damaged during delivery or is defective
                                </li>
                                <li>
                                    You received the wrong product or incorrect quantity
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <Typography variant="h6" className="font-medium text-gray-800">
                                2.2 Non-Returnable Items
                            </Typography>
                            <Typography variant="body1" className="text-gray-700">
                                The following items cannot be returned for safety, hygiene, or
                                regulatory reasons:
                            </Typography>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                <li>Prescription medications</li>
                                <li>Opened or used products</li>
                                <li>Perishable items</li>
                                <li>Items without original packaging</li>
                                <li>Personalized or custom-ordered items</li>
                                <li>Items purchased during special promotions marked as
                                    "non-returnable"</li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <Typography variant="h6" className="font-medium text-gray-800">
                                2.3 Return Process
                            </Typography>
                            <Typography variant="body1" className="text-gray-700">
                                To initiate a return:
                            </Typography>
                            <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                                <li>
                                    Contact our customer support team within 7 days of delivery at{" "}
                                    <a
                                        href="mailto:support@medvaxhealth.com"
                                        className="text-primary-500 hover:underline"
                                    >
                                        support@medvaxhealth.com
                                    </a>{" "}
                                    or call +234 812 383 4240 with your order number.
                                </li>
                                <li>
                                    Provide your order number, reason for return, and photos (if
                                    applicable, e.g., for damaged items).
                                </li>
                                <li>
                                    Our team will review your request and provide a Return
                                    Authorization (RA) number if approved.
                                </li>
                                <li>
                                    Package the item securely in its original packaging with the RA
                                    number clearly visible.
                                </li>
                                <li>
                                    We will arrange for pickup of the returned item at no additional
                                    cost to you (for eligible returns).
                                </li>
                            </ol>
                        </div>

                        <div className="space-y-3">
                            <Typography variant="h6" className="font-medium text-gray-800">
                                2.4 Return Inspection
                            </Typography>
                            <Typography variant="body1" className="text-gray-700">
                                Upon receipt of the returned item, we will inspect it within 3-5
                                business days to verify it meets our return criteria. You will be
                                notified of the inspection result via email. If the return is
                                approved, your refund or exchange will be processed as outlined
                                below.
                            </Typography>
                        </div>
                    </section>

                    {/* Refund Policy Section */}
                    <section className="space-y-4">
                        <Typography variant="h5" className="font-semibold text-gray-900">
                            3. REFUND POLICY
                        </Typography>

                        <div className="space-y-3">
                            <Typography variant="h6" className="font-medium text-gray-800">
                                3.1 Refund Eligibility
                            </Typography>
                            <Typography variant="body1" className="text-gray-700">
                                Refunds will be processed for:
                            </Typography>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                <li>Approved returns that meet our return criteria</li>
                                <li>Damaged or defective products received</li>
                                <li>Wrong products or incorrect quantities delivered</li>
                                <li>Cancelled orders (before shipment)</li>
                                <li>Failed deliveries due to our error</li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <Typography variant="h6" className="font-medium text-gray-800">
                                3.2 Refund Processing
                            </Typography>
                            <Typography variant="body1" className="text-gray-700">
                                Once your return is approved:
                            </Typography>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                <li>
                                    <strong>Refund Method:</strong> Refunds will be processed to
                                    the original payment method used for the order.
                                </li>
                                <li>
                                    <strong>Processing Time:</strong> Refunds are typically
                                    processed within 5-10 business days after return approval.
                                </li>
                                <li>
                                    <strong>Bank Processing:</strong> Depending on your bank or
                                    payment provider, it may take an additional 3-5 business days
                                    for the refund to appear in your account.
                                </li>
                                <li>
                                    <strong>Refund Amount:</strong> You will receive a full refund
                                    of the product price. Original delivery charges are
                                    non-refundable unless the return is due to our error.
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <Typography variant="h6" className="font-medium text-gray-800">
                                3.3 Partial Refunds
                            </Typography>
                            <Typography variant="body1" className="text-gray-700">
                                In cases where only part of an order is returned, a partial refund
                                will be issued for the returned items only. Delivery charges will
                                not be refunded for partial returns.
                            </Typography>
                        </div>
                    </section>

                    {/* Exchange Policy Section */}
                    <section className="space-y-4">
                        <Typography variant="h5" className="font-semibold text-gray-900">
                            4. EXCHANGE POLICY
                        </Typography>

                        <div className="space-y-3">
                            <Typography variant="h6" className="font-medium text-gray-800">
                                4.1 Product Exchanges
                            </Typography>
                            <Typography variant="body1" className="text-gray-700">
                                We offer product exchanges for items that meet our return criteria.
                                Exchanges are subject to:
                            </Typography>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                <li>
                                    Availability of the requested replacement product
                                </li>
                                <li>
                                    Price difference payment if the replacement product is more
                                    expensive
                                </li>
                                <li>
                                    Refund of price difference if the replacement product is less
                                    expensive
                                </li>
                            </ul>
                            <Typography variant="body1" className="text-gray-700">
                                To request an exchange, follow the return process outlined above
                                and specify that you would like an exchange rather than a refund.
                            </Typography>
                        </div>
                    </section>

                    {/* Damaged/Defective Items Section */}
                    <section className="space-y-4">
                        <Typography variant="h5" className="font-semibold text-gray-900">
                            5. DAMAGED OR DEFECTIVE ITEMS
                        </Typography>

                        <Typography variant="body1" className="text-gray-700">
                            If you receive a damaged or defective product:
                        </Typography>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                            <li>
                                Contact us immediately (within 48 hours of delivery) with photos
                                of the damaged or defective item
                            </li>
                            <li>
                                Provide your order number and a detailed description of the issue
                            </li>
                            <li>
                                We will arrange for immediate replacement or full refund at no
                                additional cost to you
                            </li>
                            <li>
                                We may request return of the damaged/defective item for quality
                                control purposes
                            </li>
                        </ul>
                    </section>

                    {/* Cancellation Policy Section */}
                    <section className="space-y-4">
                        <Typography variant="h5" className="font-semibold text-gray-900">
                            6. ORDER CANCELLATION
                        </Typography>

                        <div className="space-y-3">
                            <Typography variant="h6" className="font-medium text-gray-800">
                                6.1 Cancellation Before Shipment
                            </Typography>
                            <Typography variant="body1" className="text-gray-700">
                                You may cancel your order at any time before it is shipped. To
                                cancel, contact our customer support team with your order number.
                                Once cancelled, a full refund will be processed within 5-7 business
                                days.
                            </Typography>
                        </div>

                        <div className="space-y-3">
                            <Typography variant="h6" className="font-medium text-gray-800">
                                6.2 Cancellation After Shipment
                            </Typography>
                            <Typography variant="body1" className="text-gray-700">
                                Once your order has been shipped, cancellation is not possible.
                                However, you may refuse delivery or return the item following our
                                standard return process. Please note that delivery charges are
                                non-refundable for cancelled orders after shipment.
                            </Typography>
                        </div>
                    </section>

                    {/* Contact Section */}
                    <section className="space-y-4 pt-8">
                        <Typography variant="h5" className="font-semibold text-gray-900">
                            CONTACT US
                        </Typography>
                        <Typography variant="body1" className="text-gray-700">
                            If you have any questions, concerns, or need assistance with returns,
                            exchanges, or deliveries, please contact us:
                        </Typography>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                            <li>
                                <strong>Email:</strong>{" "}
                                <a
                                    href="mailto:support@medvaxhealth.com"
                                    className="text-primary-500 hover:underline"
                                >
                                    support@medvaxhealth.com
                                </a>
                            </li>
                            <li>
                                <strong>Phone:</strong> +234 812 383 4240 (Mon-Fri, 9am-6pm)
                            </li>
                            <li>
                                <strong>WhatsApp:</strong>{" "}
                                <a
                                    href="https://wa.me/2348123834240"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary-500 hover:underline"
                                >
                                    Chat with us on WhatsApp
                                </a>
                            </li>
                        </ul>
                    </section>

                    {/* Policy Updates Section */}
                    <section className="space-y-4 pt-4">
                        <Typography variant="h6" className="font-medium text-gray-800">
                            POLICY UPDATES
                        </Typography>
                        <Typography variant="body1" className="text-gray-700">
                            Medvax Health reserves the right to update or modify this Return and
                            Delivery Policy at any time. Any changes will be posted on this page
                            with an updated revision date. Continued use of our services after
                            changes constitutes acceptance of the updated policy.
                        </Typography>
                        <Typography variant="body2" className="text-gray-600 italic">
                            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </Typography>
                    </section>
                </div>
            </Shell>
        </Box>
    );
}
