import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Shell } from "@/components/ui";
import { Box, Typography } from "@mui/material";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <Shell component="section" className="my-20">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="sm:flex hidden flex-col justify-center items-center gap-4 ">
            <div className="grid grid-cols-2 gap-2 max-h-[300px] max-w-[300px] rounded-full overflow-hidden">
              <div className="row-span-2 w-full h-full rounded-xl overflow-hidden bg-gray-100">
                <img
                  src="/assets/woman-baby.png"
                  alt="Woman with baby"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-full h-full rounded-xl overflow-hidden bg-gray-100">
                <img
                  src="/assets/nurse-caring-for-male-patient.png"
                  alt="Healthcare professional"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-full h-full rounded-xl overflow-hidden bg-gray-100">
                <img
                  src="/assets/medvax-e-pharmacy-inscription.png"
                  alt="Medications and products"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <Typography
              variant="h4"
              className="font-semibold! max-w-[280px] text-center mt-20"
            >
              Get started with out E-Pharmacy & Consultation{" "}
            </Typography>
            <Typography
              variant="body1"
              className="text-gray-600 max-w-[300px] text-center"
            >
              As a full-service pharmacy and healthcare solutions provider, we
              connect individuals, providers, payers, and their enrollee{" "}
            </Typography>
          </div>
          <div>
            <div className="w-full h-full max-w-[322px] mx-auto">
              {children}
            </div>
          </div>
        </div>
      </Shell>

      <Footer />
    </>
  );
}
