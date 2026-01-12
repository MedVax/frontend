"use client";

import { Button } from "@mui/material";

export function HealthcareSolutions() {
  return (
    <section className="flex flex-col items-center mb-16">
      <h2 className="font-semibold text-4xl text-black text-center mb-12 font-[family-name:var(--font-nunito)]">
        One-top healthcare
        <br />
        solutions provider
      </h2>

      {/* E-Pharmacy and Consultation */}
      <div className="flex gap-4 mb-4 w-full">
        {/* E-Pharmacy Card */}
        <div className="flex-1 bg-gray-50 rounded-3xl p-10 flex flex-col gap-6">
          <div className="flex flex-col items-start w-full">
            <span className="font-semibold text-base text-[#e91d74] mb-2 font-[family-name:var(--font-nunito)]">
              E-Pharmacy
            </span>
            <h3 className="font-semibold text-2xl text-black mb-2 font-[family-name:var(--font-nunito)]">
              Order medications with ease.
            </h3>
            <p className="font-normal text-base text-gray-600 font-[family-name:var(--font-nunito)]">
              Easily access verified medications, supplements, and health
              essentials with quick, reliable delivery straight to your
              doorstep.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-[262px] h-[262px] rounded-full bg-[#e3dfda] border-8 border-white shadow-lg overflow-hidden">
              <img
                src="/assets/order-medications.png"
                alt="Pharmacy"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Consultation Card */}
        <div className="flex-1 bg-gray-50 rounded-3xl p-10 flex flex-col gap-6">
          <div className="flex flex-col items-start w-full">
            <span className="font-semibold text-base text-[#e91d74] mb-2 font-[family-name:var(--font-nunito)]">
              Consultation
            </span>
            <h3 className="font-semibold text-2xl text-black mb-2 font-[family-name:var(--font-nunito)]">
              Speak with a licensed expert anytime
            </h3>
            <p className="font-normal text-base text-gray-600 font-[family-name:var(--font-nunito)]">
              Connect with licensed doctors and pharmacists for real-time
              medical advice, prescription support, and follow-up guidance
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-[262px] h-[262px] rounded-full bg-[#e3dfda] border-8 border-white shadow-lg overflow-hidden">
              <img
                src="/assets/licensed-experts.png"
                alt="Consultation"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Chatbot Section */}
      <div className="bg-gray-50 rounded-3xl p-10 flex flex-col gap-6 items-center w-full">
        <div className="flex flex-col items-center gap-6 max-w-[469px]">
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="font-semibold text-base text-[#e91d74] font-[family-name:var(--font-nunito)]">
              Chatbot
            </span>
            <h3 className="font-medium text-4xl text-black tracking-[-0.8px] font-[family-name:var(--font-nunito)]">
              Instant answers,
              <br />
              personalized support.
            </h3>
            <p className="font-normal text-base text-gray-600 font-[family-name:var(--font-nunito)]">
              Get instant, AI-powered answers to symptoms, medication questions,
              and basic health concerns, available around the clock.
            </p>
          </div>
          <Button
            sx={{
              background: "linear-gradient(180deg, #f472b6 0%, #db2777 100%)",
              borderRadius: "84px",
              height: 56,
              width: 187,
              textTransform: "none",
              fontFamily: "var(--font-nunito)",
              fontWeight: 500,
              fontSize: 16,
              color: "white",
              boxShadow: "none",
              "&:hover": {
                background: "linear-gradient(180deg, #ec4899 0%, #be185d 100%)",
              },
            }}
          >
            Chat with us
          </Button>
        </div>

        {/* Phone Mockup */}
        <div className="w-[280px] h-[400px] relative bg-gray-100 rounded-[40px] border-8 border-gray-800 overflow-hidden shadow-2xl">
          {/* Phone notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-gray-800 rounded-b-2xl z-10" />

          {/* Chat UI */}
          <div className="p-4 pt-8 h-full bg-white">
            {/* Bot message */}
            <div className="mb-3">
              <div className="bg-gray-100 rounded-2xl rounded-bl-sm p-3 max-w-[80%] text-xs">
                Hello! How can I assist you today?
              </div>
              <span className="text-[10px] text-gray-400 mt-1 block">9:41</span>
            </div>

            {/* User message */}
            <div className="mb-3 flex flex-col items-end">
              <div className="bg-gradient-to-br from-pink-400 to-pink-600 text-white rounded-2xl rounded-br-sm p-3 max-w-[80%] text-xs">
                Hi, I need to speak with a doctor
              </div>
              <span className="text-[10px] text-gray-400 mt-1">9:42</span>
            </div>

            {/* Bot response */}
            <div className="mb-3">
              <div className="bg-gray-100 rounded-2xl rounded-bl-sm p-3 max-w-[80%] text-xs">
                Sure, I can help with that.
                <br />
                <br />
                Please briefly describe your symptoms.
              </div>
              <span className="text-[10px] text-gray-400 mt-1 block">9:42</span>
            </div>

            {/* User message */}
            <div className="mb-3 flex flex-col items-end">
              <div className="bg-gradient-to-br from-pink-400 to-pink-600 text-white rounded-2xl rounded-br-sm p-3 max-w-[80%] text-xs">
                I've had a cough and sore throat since yesterday
              </div>
              <span className="text-[10px] text-gray-400 mt-1">9:43</span>
            </div>

            {/* Bot response */}
            <div>
              <div className="bg-gray-100 rounded-2xl rounded-bl-sm p-3 max-w-[80%] text-xs">
                I will connect you with a doctor. One moment please
              </div>
              <span className="text-[10px] text-gray-400 mt-1 block">9:44</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
