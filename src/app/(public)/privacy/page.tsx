"use client";

import { Box, Typography } from "@mui/material";
import { Shell } from "@/components/ui";

export default function PrivacyPolicyPage() {
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
                            MEDVAX HEALTH PRIVACY POLICY
                        </Typography>
                        <Typography variant="body1" className="text-gray-700">
                            This privacy policy ("policy") describes the information Medvax
                            Health ("we") collects when you visit and use our website ("the
                            site", www.medvaxhealth.com), as well as how we use the data to
                            support our features and services.
                        </Typography>
                        <Typography variant="body1" className="text-gray-700">
                            By continuing to use the site, you acknowledge that you have
                            reviewed this privacy policy, agree to its terms and you have
                            consented to the use of your information such as personal data and
                            device information, and the applicable disclosures.
                        </Typography>
                    </div>

                    {/* Section 1 */}
                    <section className="space-y-4">
                        <Typography variant="h5" className="font-semibold text-gray-900">
                            1. THE DATA WE COLLECT
                        </Typography>
                        <Typography variant="body1" className="text-gray-700">
                            Generally, we do not require any personal data when you visit our
                            website only without using any of our services. When you decide to
                            use our services or features, you are required to create and account
                            and we collect various information to assist in providing you with
                            our services and improve on existing features.
                        </Typography>
                        <Typography variant="body1" className="text-gray-700">
                            You will be required to provide the details such as: Full name,
                            Email, Password, Device token, Specialization, Phone number, Bio,
                            Medical license image, User image, Age, Address and Card details
                            (optional).
                        </Typography>
                        <Typography variant="body1" className="text-gray-700">
                            We also collect certain information about your device when you visit
                            the website, including information about your web browser, IP
                            address, time zone, location and some of the cookies that are
                            installed on your device.
                        </Typography>
                    </section>

                    {/* Section 2 */}
                    <section className="space-y-4">
                        <Typography variant="h5" className="font-semibold text-gray-900">
                            2. WHY WE COLLECT YOUR DATA?
                        </Typography>
                        <Typography variant="body1" className="text-gray-700">
                            We intend to use the information collected for the following
                            purposes:
                        </Typography>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                            <li>
                                <strong>Account Management:</strong> To create and manage user
                                accounts, allowing users to access and utilize the features and
                                services offered by our platform.
                            </li>
                            <li>
                                <strong>Communication:</strong> To facilitate communication with
                                users, including responding to inquiries, providing support, and
                                sending important updates or notifications related to their
                                accounts or the services provided.
                            </li>
                            <li>
                                <strong>Personalization:</strong> To personalize user experiences
                                and tailor content, recommendations, and offerings based on user
                                preferences, behaviors, and interactions with our platform.
                            </li>
                            <li>
                                <strong>Improvement of Services:</strong> To analyze user data and
                                feedback in order to improve the quality, functionality, and
                                usability of our platform, as well as to develop new features and
                                services that better meet user needs and preferences.
                            </li>
                        </ul>
                    </section>

                    {/* Section 3 */}
                    <section className="space-y-4">
                        <Typography variant="h5" className="font-semibold text-gray-900">
                            3. WE USE THE FOLLOWING TECHNOLOGIES TO COLLECT YOUR DATA
                        </Typography>
                        <Typography variant="body1" className="text-gray-700">
                            We only use methods that ensure secure and efficient data
                            transmission and processing. We do not use cookies for data
                            collection. We collect data based on permissions granted by the
                            users such as:
                        </Typography>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                            <li>Camera access</li>
                            <li>Storage</li>
                            <li>Location data</li>
                        </ul>
                        <Typography variant="body1" className="text-gray-700">
                            We also collect data using the following technologies:
                        </Typography>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                            <li>HTTP requests</li>
                            <li>RESTful API</li>
                            <li>
                                Authentication tokens and database queries (with MongoDB)
                            </li>
                            <li>
                                Firebase Analytics (for Google search API), with the permission
                                of users
                            </li>
                        </ul>
                    </section>

                    {/* Section 4 */}
                    <section className="space-y-4">
                        <Typography variant="h5" className="font-semibold text-gray-900">
                            4. HOW WE STORE YOUR DATA
                        </Typography>
                        <Typography variant="body1" className="text-gray-700">
                            The information collected is stored securely within our project
                            database, which is built on MongoDB. Our database infrastructure
                            utilizes various cloud-based storage solutions. For this
                            application, we have opted to host our data on Amazon Web Services
                            (AWS), located in the Paris region.
                        </Typography>
                    </section>

                    {/* Section 5 */}
                    <section className="space-y-4">
                        <Typography variant="h5" className="font-semibold text-gray-900">
                            5. SAFEGUARDING AND SECURING THE DATA
                        </Typography>
                        <Typography variant="body1" className="text-gray-700">
                            Your Personal Data shall be collected and processed in accordance
                            with specific, legitimate and lawful purpose consented to by you
                            provided that a further processing may be done only for archiving,
                            scientific research, historical research or statistical purposes
                            for public interest.
                        </Typography>
                        <Typography variant="body1" className="text-gray-700">
                            We employ robust encryption techniques, leveraging tools such as
                            crypto-js, to ensure the secure handling of critical information
                            including bank details, passwords, and chat communications.
                            Additionally, we implement strict authentication protocols
                            utilizing Jsonwebtoken, which serves as a safeguard against
                            unauthorized access attempts. These measures collectively uphold
                            our commitment to safeguarding user data and maintaining the
                            integrity and confidentiality of our platform.
                        </Typography>
                    </section>

                    {/* Section 6 */}
                    <section className="space-y-4">
                        <Typography variant="h5" className="font-semibold text-gray-900">
                            6. RIGHT TO RESTRICT THE COLLECTION OF YOUR PERSONAL DATA
                        </Typography>
                        <Typography variant="body1" className="text-gray-700">
                            At some point, you might wish to restrict the use and collection of
                            your personal data. You can achieve this by doing the following:
                        </Typography>
                        <Typography variant="body1" className="text-gray-700">
                            When you are filling the forms on the website, make sure to check
                            if there is a box which you can leave unchecked, if you don't want
                            to disclose your personal information.
                        </Typography>
                        <Typography variant="body1" className="text-gray-700">
                            If you have already agreed to share your information with us, feel
                            free to contact us via email and we will be more than happy to
                            change this for you.
                        </Typography>
                    </section>

                    {/* Section 7 */}
                    <section className="space-y-4">
                        <Typography variant="h5" className="font-semibold text-gray-900">
                            7. ACCESS TO YOUR DATA AND RIGHT TO MAKE CHANGES
                        </Typography>
                        <Typography variant="body1" className="text-gray-700">
                            You can access and update your information conveniently through our
                            mobile application, ensuring transparency and control over their
                            personal data. Here's a step-by-step process for accessing and
                            making changes to your information:
                        </Typography>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                            <li>
                                <strong>Accessing Information:</strong> You can initiate a
                                request to view your information by tapping the 'Account' section
                                within the mobile application. Upon submitting the request, the
                                application communicates with the server to retrieve the
                                requested information. If the request is successful, you will be
                                provided with access to your data directly within the application.
                            </li>
                            <li>
                                <strong>Updating Information:</strong> To make changes to your
                                profile information, you can navigate to the 'Account' section
                                within the mobile application and tap on the edit icon. Here, you
                                can modify relevant details such as your full name, phone number,
                                specialization and bio. Upon submitting the changes, the
                                application sends an edit profile request to the server. If the
                                request is successful, the updated information is seamlessly
                                reflected in the database.
                            </li>
                        </ul>
                        <Typography variant="body1" className="text-gray-700">
                            If you encounter any difficulties with this process or need
                            assistance, you can contact our support team via email:{" "}
                            <a
                                href="mailto:info@medvaxhealth.com"
                                className="text-primary-500 hover:underline"
                            >
                                info@medvaxhealth.com
                            </a>
                            .
                        </Typography>
                    </section>

                    {/* Section 8 */}
                    <section className="space-y-4">
                        <Typography variant="h5" className="font-semibold text-gray-900">
                            8. THIRD PARTY ACCESS TO DATA
                        </Typography>
                        <Typography variant="body1" className="text-gray-700">
                            We engage trusted third-party service providers to assist us in
                            delivering our services effectively like Paystack and Nodemailer.
                            These providers may have access to certain information solely for
                            the purpose of performing tasks on our behalf, such as processing
                            payments or providing customer support. We ensure that these
                            service providers adhere to strict confidentiality and data
                            protection standards.
                        </Typography>
                    </section>

                    {/* Section 9 */}
                    <section className="space-y-4">
                        <Typography variant="h5" className="font-semibold text-gray-900">
                            9. DATA RETENTION
                        </Typography>
                        <Typography variant="body1" className="text-gray-700">
                            The information you provide will be retained for as long as your
                            account remains active. In the event that you deactivate your
                            account, your data will be securely stored for a period of 30 days
                            before being permanently deleted from our systems. This retention
                            period ensures compliance with our data retention policies and
                            allows you the opportunity to reactivate your account if desired.
                        </Typography>
                    </section>

                    {/* Section 10 */}
                    <section className="space-y-4">
                        <Typography variant="h5" className="font-semibold text-gray-900">
                            10. REMEDY FOR VIOLATION OF THIS POLICY
                        </Typography>
                        <Typography variant="body1" className="text-gray-700">
                            We are committed to protecting the data you provide us, in line with
                            this policy. However, in the unlikely event that we violate this
                            privacy policy, you may contact us to notify us of the violation
                            and request redress.
                        </Typography>
                        <Typography variant="body1" className="text-gray-700">
                            When notice of a violation is investigated and confirmed, the act
                            or omission causing such violation shall be immediately corrected
                            and an amicable settlement reached to compensate you where
                            necessary.
                        </Typography>
                        <Typography variant="body1" className="text-gray-700">
                            All claims for remedy shall be resolved not later than 30 days
                            after the complaint was lodged.
                        </Typography>
                    </section>

                    {/* Section 11 */}
                    <section className="space-y-4">
                        <Typography variant="h5" className="font-semibold text-gray-900">
                            11. NOTIFICATION OF CHANGE OF POLICY
                        </Typography>
                        <Typography variant="body1" className="text-gray-700">
                            When releasing a new version of the mobile app, we will include
                            information about the updated privacy policy in the update
                            description on the Apple App Store and Google Play Store. This
                            ensures that you are informed before downloading or updating the
                            app. In addition, once you open the app, a dialog box will pop up
                            informing you of the changes to the privacy policy and prompting
                            you to accept in order to continue using the Medtracka application.
                        </Typography>
                    </section>

                    {/* Section 12 */}
                    <section className="space-y-4">
                        <Typography variant="h5" className="font-semibold text-gray-900">
                            12. LINKS TO OTHER WEBSITES
                        </Typography>
                        <Typography variant="body1" className="text-gray-700">
                            Our website contains links that lead to other websites. If you click
                            on these links, Medvax Health is not held responsible for your data
                            and privacy protection. Visiting those websites is not governed by
                            this privacy policy agreement. Make sure to read the privacy policy
                            documentation of the website you go to from our website.
                        </Typography>
                    </section>

                    {/* Contact Section */}
                    <section className="space-y-4 pt-8">
                        <Typography variant="h5" className="font-semibold text-gray-900">
                            How you can contact us
                        </Typography>
                        <Typography variant="body1" className="text-gray-700">
                            If you have any questions, comments, or concerns regarding this
                            Privacy Policy, please contact us via email at{" "}
                            <a
                                href="mailto:info@medvaxhealth.com"
                                className="text-primary-500 hover:underline"
                            >
                                info@medvaxhealth.com
                            </a>
                            .
                        </Typography>
                    </section>
                </div>
            </Shell>
        </Box>
    );
}
