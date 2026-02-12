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
              This Return & Delivery Policy ("Policy") outlines the terms and
              conditions governing the delivery of products and services, as
              well as the return and refund procedures for Medvax Health ("we",
              "us", "our") when you use our website ("the site",
              www.medvaxhealth.com) and services.
            </Typography>
            <Typography variant="body1" className="text-gray-700">
              By placing an order with Medvax Health, you acknowledge that you
              have read, understood, and agree to be bound by this Policy. Please
              review this Policy carefully before making a purchase.
            </Typography>
          </div>

          {/* DELIVERY POLICY SECTION */}
          <section className="space-y-6">
            <Typography variant="h4" className="font-bold text-gray-900">
              DELIVERY POLICY
            </Typography>

            {/* Section 1: Delivery Areas */}
            <div className="space-y-4">
              <Typography variant="h5" className="font-semibold text-gray-900">
                1. Delivery Areas
              </Typography>
              <Typography variant="body1" className="text-gray-700">
                Medvax Health currently provides delivery services to major cities
                across Nigeria. We are continuously expanding our delivery network
                to serve more locations. During checkout, you can verify if
                delivery is available to your address.
              </Typography>
              <Typography variant="body1" className="text-gray-700">
                If your location is not currently serviced, we will notify you
                during the checkout process. We recommend checking our website
                regularly for updates on new delivery areas.
              </Typography>
            </div>

            {/* Section 2: Delivery Timeframes */}
            <div className="space-y-4">
              <Typography variant="h5" className="font-semibold text-gray-900">
                2. Delivery Timeframes
              </Typography>
              <Typography variant="body1" className="text-gray-700">
                We strive to deliver your orders as quickly as possible:
              </Typography>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  <strong>Same-Day Delivery:</strong> Available in major cities
                  for orders placed before 2:00 PM on business days. Orders
                  placed after this time will be processed the next business day.
                </li>
                <li>
                  <strong>Standard Delivery:</strong> 2-5 business days for
                  areas outside major cities or for orders that do not qualify for
                  same-day delivery.
                </li>
                <li>
                  <strong>Prescription Orders:</strong> Delivery may take
                  additional time (1-2 business days) to allow for prescription
                  verification and processing.
                </li>
                <li>
                  <strong>Consultation Services:</strong> Virtual consultations
                  are scheduled based on consultant availability. You will receive
                  confirmation and meeting details via email and SMS.
                </li>
              </ul>
              <Typography variant="body1" className="text-gray-700">
                Delivery timeframes are estimates and may be affected by factors
                beyond our control, including weather conditions, public holidays,
                or unforeseen circumstances. We will notify you of any significant
                delays.
              </Typography>
            </div>

            {/* Section 3: Delivery Charges */}
            <div className="space-y-4">
              <Typography variant="h5" className="font-semibold text-gray-900">
                3. Delivery Charges
              </Typography>
              <Typography variant="body1" className="text-gray-700">
                Delivery charges vary based on your location and the delivery
                option selected:
              </Typography>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  <strong>Same-Day Delivery:</strong> Charges apply and will be
                  displayed at checkout.
                </li>
                <li>
                  <strong>Standard Delivery:</strong> Charges vary by location
                  and order value. Free delivery may be available for orders
                  above a certain threshold.
                </li>
                <li>
                  <strong>Express Delivery:</strong> Available in select areas
                  for an additional fee.
                </li>
              </ul>
              <Typography variant="body1" className="text-gray-700">
                All delivery charges are clearly displayed during checkout before
                you complete your purchase. Delivery charges are non-refundable
                unless the order is cancelled before shipment or returned due to
                our error.
              </Typography>
            </div>

            {/* Section 4: Order Tracking */}
            <div className="space-y-4">
              <Typography variant="h5" className="font-semibold text-gray-900">
                4. Order Tracking
              </Typography>
              <Typography variant="body1" className="text-gray-700">
                Once your order has been shipped, you will receive tracking
                information via email and SMS. You can track your order status
                through:
              </Typography>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Your account dashboard on our website</li>
                <li>Tracking link provided in your confirmation email</li>
                <li>Contacting our customer service team</li>
              </ul>
            </div>

            {/* Section 5: Delivery Requirements */}
            <div className="space-y-4">
              <Typography variant="h5" className="font-semibold text-gray-900">
                5. Delivery Requirements
              </Typography>
              <Typography variant="body1" className="text-gray-700">
                To ensure successful delivery:
              </Typography>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  Provide accurate and complete delivery address information
                </li>
                <li>
                  Ensure someone is available to receive the delivery at the
                  specified address
                </li>
                <li>
                  For prescription medications, ensure you have a valid
                  prescription ready for verification if required
                </li>
                <li>
                  Provide a valid contact phone number for delivery coordination
                </li>
              </ul>
              <Typography variant="body1" className="text-gray-700">
                If delivery cannot be completed due to incorrect address
                information or unavailability at the delivery location, additional
                delivery charges may apply for re-delivery attempts.
              </Typography>
            </div>
          </section>

          {/* RETURN POLICY SECTION */}
          <section className="space-y-6">
            <Typography variant="h4" className="font-bold text-gray-900">
              RETURN POLICY
            </Typography>

            {/* Section 1: Return Eligibility */}
            <div className="space-y-4">
              <Typography variant="h5" className="font-semibold text-gray-900">
                1. Return Eligibility
              </Typography>
              <Typography variant="body1" className="text-gray-700">
                You may return products purchased from Medvax Health under the
                following conditions:
              </Typography>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  Returns must be initiated within <strong>7 days</strong> of
                  delivery for non-prescription products
                </li>
                <li>
                  Products must be unopened, unused, and in their original
                  packaging with all seals intact
                </li>
                <li>
                  Prescription medications may only be returned if they are
                  unopened, in original packaging, and if there was an error in
                  the order (wrong product, damaged item, or expired product)
                </li>
                <li>
                  Products must be in saleable condition with all original labels
                  and documentation
                </li>
              </ul>
            </div>

            {/* Section 2: Non-Returnable Items */}
            <div className="space-y-4">
              <Typography variant="h5" className="font-semibold text-gray-900">
                2. Non-Returnable Items
              </Typography>
              <Typography variant="body1" className="text-gray-700">
                For health and safety reasons, the following items cannot be
                returned:
              </Typography>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  Opened prescription medications (unless there was an error on
                  our part)
                </li>
                <li>Personalized or custom-made products</li>
                <li>Perishable items that have been opened</li>
                <li>Products damaged due to misuse or negligence</li>
                <li>Digital products or services that have been accessed</li>
                <li>Consultation services that have been completed</li>
              </ul>
            </div>

            {/* Section 3: Return Process */}
            <div className="space-y-4">
              <Typography variant="h5" className="font-semibold text-gray-900">
                3. Return Process
              </Typography>
              <Typography variant="body1" className="text-gray-700">
                To initiate a return:
              </Typography>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  Contact our customer service team at{" "}
                  <a
                    href="mailto:info@medvaxhealth.com"
                    className="text-primary-500 hover:underline"
                  >
                    info@medvaxhealth.com
                  </a>{" "}
                  or call{" "}
                  <a
                    href="tel:+2348123834240"
                    className="text-primary-500 hover:underline"
                  >
                    +234 812 383 4240
                  </a>{" "}
                  within the return eligibility period
                </li>
                <li>
                  Provide your order number and reason for return
                </li>
                <li>
                  Our team will review your request and provide a Return
                  Authorization (RA) number if approved
                </li>
                <li>
                  Package the item(s) securely in the original packaging with the
                  RA number clearly visible
                </li>
                <li>
                  We will arrange for pickup or provide instructions for
                  returning the item(s) to our facility
                </li>
              </ol>
              <Typography variant="body1" className="text-gray-700">
                Returns will not be processed without a valid RA number. Please
                do not send items back without prior authorization.
              </Typography>
            </div>

            {/* Section 4: Return Shipping */}
            <div className="space-y-4">
              <Typography variant="h5" className="font-semibold text-gray-900">
                4. Return Shipping
              </Typography>
              <Typography variant="body1" className="text-gray-700">
                Return shipping costs are handled as follows:
              </Typography>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  <strong>Our Error:</strong> If the return is due to our error
                  (wrong product, damaged item, expired product), we will cover
                  all return shipping costs.
                </li>
                <li>
                  <strong>Customer Request:</strong> If you are returning an item
                  for reasons other than our error, return shipping costs will be
                  your responsibility unless otherwise stated.
                </li>
                <li>
                  We may arrange for pickup of returned items in select areas at
                  no additional cost.
                </li>
              </ul>
            </div>

            {/* Section 5: Order Cancellation */}
            <div className="space-y-4">
              <Typography variant="h5" className="font-semibold text-gray-900">
                5. Order Cancellation
              </Typography>
              <Typography variant="body1" className="text-gray-700">
                You may cancel your order under the following conditions:
              </Typography>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  Orders can be cancelled within <strong>2 hours</strong> of
                  placement, provided the order has not been processed or shipped.
                </li>
                <li>
                  To cancel, contact our customer service team immediately with
                  your order number.
                </li>
                <li>
                  Once an order has been shipped, it cannot be cancelled but may
                  be returned according to our return policy.
                </li>
                <li>
                  Cancelled orders will be refunded in full, including delivery
                  charges, if applicable.
                </li>
              </ul>
            </div>
          </section>

          {/* REFUND POLICY SECTION */}
          <section className="space-y-6">
            <Typography variant="h4" className="font-bold text-gray-900">
              REFUND POLICY
            </Typography>

            {/* Section 1: Refund Eligibility */}
            <div className="space-y-4">
              <Typography variant="h5" className="font-semibold text-gray-900">
                1. Refund Eligibility
              </Typography>
              <Typography variant="body1" className="text-gray-700">
                Refunds will be issued in the following circumstances:
              </Typography>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Orders cancelled within the cancellation period</li>
                <li>
                  Returns approved under our return policy and received by us
                </li>
                <li>Duplicate charges or payment errors</li>
                <li>
                  Orders that cannot be fulfilled due to unavailability of
                  products
                </li>
                <li>
                  Defective, damaged, or expired products received (subject to
                  verification)
                </li>
                <li>Wrong products delivered due to our error</li>
              </ul>
            </div>

            {/* Section 2: Refund Processing Time */}
            <div className="space-y-4">
              <Typography variant="h5" className="font-semibold text-gray-900">
                2. Refund Processing Time
              </Typography>
              <Typography variant="body1" className="text-gray-700">
                Once we receive and verify your returned item(s), we will process
                your refund:
              </Typography>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  Refunds are typically processed within <strong>5-10 business
                  days</strong> after we receive the returned item(s)
                </li>
                <li>
                  For cancelled orders (before shipment), refunds are processed
                  within <strong>3-5 business days</strong>
                </li>
                <li>
                  The refund will be credited to the original payment method used
                  for the purchase
                </li>
                <li>
                  Please note that it may take additional time for your bank or
                  payment provider to reflect the refund in your account
                </li>
              </ul>
            </div>

            {/* Section 3: Refund Amount */}
            <div className="space-y-4">
              <Typography variant="h5" className="font-semibold text-gray-900">
                3. Refund Amount
              </Typography>
              <Typography variant="body1" className="text-gray-700">
                The refund amount will include:
              </Typography>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>The full purchase price of the returned item(s)</li>
                <li>
                  Original delivery charges (if the entire order is returned or if
                  the return is due to our error)
                </li>
                <li>
                  Return shipping costs (if the return is due to our error)
                </li>
              </ul>
              <Typography variant="body1" className="text-gray-700">
                If only part of an order is returned, delivery charges will be
                refunded proportionally. Return shipping costs paid by the
                customer (for non-error returns) are not refundable.
              </Typography>
            </div>

            {/* Section 4: Refund Method */}
            <div className="space-y-4">
              <Typography variant="h5" className="font-semibold text-gray-900">
                4. Refund Method
              </Typography>
              <Typography variant="body1" className="text-gray-700">
                Refunds will be processed to the original payment method used for
                the purchase:
              </Typography>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  Credit/Debit Card: Refunded to the same card (may take 5-10
                  business days to appear)
                </li>
                <li>
                  Bank Transfer: Refunded to the originating bank account (may
                  take 3-7 business days)
                </li>
                <li>
                  Mobile Money: Refunded to the originating mobile money account
                  (may take 1-3 business days)
                </li>
              </ul>
              <Typography variant="body1" className="text-gray-700">
                If the original payment method is no longer available, please
                contact our customer service team to arrange an alternative refund
                method.
              </Typography>
            </div>
          </section>

          {/* SPECIAL CONSIDERATIONS */}
          <section className="space-y-6">
            <Typography variant="h4" className="font-bold text-gray-900">
              SPECIAL CONSIDERATIONS
            </Typography>

            {/* Section 1: Prescription Medications */}
            <div className="space-y-4">
              <Typography variant="h5" className="font-semibold text-gray-900">
                1. Prescription Medications
              </Typography>
              <Typography variant="body1" className="text-gray-700">
                Due to health and safety regulations, prescription medications
                have special return conditions:
              </Typography>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  Prescription medications cannot be returned once opened or used
                </li>
                <li>
                  Unopened prescription medications may only be returned if there
                  was an error in the order (wrong product, damaged packaging,
                  expired product)
                </li>
                <li>
                  Returns must be authorized by our pharmacy team and may require
                  verification
                </li>
                <li>
                  All prescription medication returns must comply with
                  pharmaceutical regulations
                </li>
              </ul>
            </div>

            {/* Section 2: Damaged or Defective Items */}
            <div className="space-y-4">
              <Typography variant="h5" className="font-semibold text-gray-900">
                2. Damaged or Defective Items
              </Typography>
              <Typography variant="body1" className="text-gray-700">
                If you receive a damaged or defective item:
              </Typography>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  Contact us immediately (within 48 hours of delivery) with
                  photos of the damage
                </li>
                <li>
                  We will arrange for replacement or full refund, including
                  return shipping costs
                </li>
                <li>
                  Do not use damaged or defective products, especially
                  medications
                </li>
              </ul>
            </div>

            {/* Section 3: Consultation Services */}
            <div className="space-y-4">
              <Typography variant="h5" className="font-semibold text-gray-900">
                3. Consultation Services
              </Typography>
              <Typography variant="body1" className="text-gray-700">
                Consultation services are non-refundable once the consultation has
                been completed. However:
              </Typography>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  You may reschedule or cancel a consultation up to 24 hours
                  before the scheduled time for a full refund
                </li>
                <li>
                  Cancellations within 24 hours may be subject to a cancellation
                  fee
                </li>
                <li>
                  If a consultant fails to attend or there are technical issues
                  on our end, a full refund or rescheduling will be offered
                </li>
              </ul>
            </div>
          </section>

          {/* CONTACT SECTION */}
          <section className="space-y-4 pt-8">
            <Typography variant="h5" className="font-semibold text-gray-900">
              Questions or Concerns?
            </Typography>
            <Typography variant="body1" className="text-gray-700">
              If you have any questions, concerns, or need assistance with
              returns, refunds, or deliveries, please contact our customer
              service team:
            </Typography>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>
                Email:{" "}
                <a
                  href="mailto:info@medvaxhealth.com"
                  className="text-primary-500 hover:underline"
                >
                  info@medvaxhealth.com
                </a>
              </li>
              <li>
                Phone:{" "}
                <a
                  href="tel:+2348123834240"
                  className="text-primary-500 hover:underline"
                >
                  +234 812 383 4240
                </a>
              </li>
              <li>Business Hours: Monday - Friday, 8:00 AM - 6:00 PM (WAT)</li>
            </ul>
            <Typography variant="body1" className="text-gray-700">
              We are committed to resolving any issues promptly and ensuring your
              satisfaction with our services.
            </Typography>
          </section>

          {/* POLICY UPDATES */}
          <section className="space-y-4 pt-4">
            <Typography variant="body2" className="text-gray-600 italic">
              Last Updated: {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Typography>
            <Typography variant="body2" className="text-gray-600">
              Medvax Health reserves the right to modify this Return & Delivery
              Policy at any time. Changes will be effective immediately upon
              posting on our website. Your continued use of our services
              constitutes acceptance of any modifications to this Policy.
            </Typography>
          </section>
        </div>
      </Shell>
    </Box>
  );
}
