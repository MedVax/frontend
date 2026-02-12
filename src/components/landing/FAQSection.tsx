"use client";

import { useState } from "react";
import { Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { Icon } from "@iconify/react";
import { Shell } from "../ui";

const faqs = [
  {
    question: "How do I order medications?",
    answer:
      "You can order medications by browsing our product catalog, adding items to your cart, and proceeding to checkout. We accept various payment methods and offer same-day delivery in select areas.",
  },
  {
    question: "Do I need a prescription to order medications?",
    answer:
      "Some medications require a valid prescription from a licensed healthcare provider. You can upload your prescription during checkout, or consult with one of our licensed doctors through our platform.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery times vary by location. We offer same-day delivery in major cities and standard delivery within 2-5 business days for other areas. You'll receive tracking information once your order is shipped.",
  },
  {
    question: "Can I consult with a doctor online?",
    answer:
      "Yes! You can book a consultation with our licensed healthcare consultants through the platform. Consultations are available via video call, and you'll receive an e-prescription if needed.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept major credit cards, debit cards, bank transfers, and mobile money payments. All transactions are secure and encrypted.",
  },
  {
    question: "Is my personal information secure?",
    answer:
      "Absolutely. We use industry-standard encryption and security measures to protect your personal and medical information. Your privacy is our top priority.",
  },
  {
    question: "Can I cancel or modify my order?",
    answer:
      "You can cancel or modify your order within 2 hours of placing it, provided it hasn't been shipped. Once shipped, you can return items according to our return policy.",
  },
  {
    question: "Do you deliver to all locations in Nigeria?",
    answer:
      "We currently deliver to major cities across Nigeria, with plans to expand coverage. Check your delivery address during checkout to confirm availability in your area.",
  },
];

export function FAQSection() {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Shell component="section" className="flex flex-col gap-6 py-8 bg-white" id="faq">
      <Typography variant="h4" className="font-semibold! text-center mb-8">
        Frequently Asked Questions
      </Typography>
      <div className="max-w-3xl mx-auto w-full space-y-2">
        {faqs.map((faq, index) => {
          const panelId = `faq-panel-${index}`;
          return (
            <Accordion
              key={index}
              expanded={expanded === panelId}
              onChange={handleChange(panelId)}
              sx={{
                border: "1px solid #e4e4e4",
                borderRadius: "8px!",
                boxShadow: "none",
                "&:before": {
                  display: "none",
                },
                "&.Mui-expanded": {
                  margin: "0!important",
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <Icon
                    icon={
                      expanded === panelId
                        ? "solar:alt-arrow-up-linear"
                        : "solar:alt-arrow-down-linear"
                    }
                    width={24}
                    height={24}
                    className="text-[#e91d74]"
                  />
                }
                sx={{
                  px: 3,
                  py: 2,
                  "&.Mui-expanded": {
                    minHeight: "auto",
                  },
                  "& .MuiAccordionSummary-content": {
                    margin: "12px 0!important",
                    "&.Mui-expanded": {
                      margin: "12px 0!important",
                    },
                  },
                }}
              >
                <Typography variant="h6" className="font-semibold! pr-4">
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  px: 3,
                  pb: 3,
                  pt: 0,
                }}
              >
                <Typography variant="body1" color="text.secondary">
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </Shell>
  );
}
