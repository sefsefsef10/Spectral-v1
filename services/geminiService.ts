import { GoogleGenAI } from "@google/genai";
import { TrustPassport } from "../types";
import { PRD_TEXT } from './prd';


const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generatePassportSummary = async (passportData: TrustPassport): Promise<string> => {
    if (!API_KEY) {
        return "Gemini API key is not configured. Cannot generate summary.";
    }

    const model = 'gemini-2.5-flash';
    const systemInstruction = `You are an expert AI governance and healthcare compliance analyst. Your task is to generate a concise, professional executive summary of the provided AI Trust Passport JSON data. The summary should be suitable for a CISO or procurement officer.

- Start with a brief overview of the AI model and its purpose.
- Highlight the key verification results, focusing on strengths and calling out metrics that are particularly good (e.g., high reliability, high prompt injection resilience).
- Mention the compliance frameworks covered.
- Summarize the key risks from the risk register, along with their stated mitigations.
- Conclude with an overall statement about the model's readiness based on the passport data.
- Format the output in clean, readable HTML. Use headings (like <h3> for sections) and bullet points (<ul> with <li> items). Do not include <html> or <body> tags.`;
    
    const contents = `AI Trust Passport Data:
      ${JSON.stringify(passportData, null, 2)}
    `;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: contents,
            config: {
                systemInstruction: systemInstruction,
            },
        });
        return response.text;
    } catch (error) {
        console.error("Error generating summary with Gemini:", error);
        return "An error occurred while generating the AI summary. Please check the console for details.";
    }
};


export const generateFeatureSummary = async (featureName: string): Promise<string> => {
    if (!API_KEY) {
        return "Gemini API key is not configured. Cannot generate feature summary.";
    }

    const model = 'gemini-2.5-flash';
    const systemInstruction = `You are a product marketing expert. Based on the provided Product Requirements Document (PRD), find the section that describes the feature named "${featureName}".

Your task is to generate a concise, exciting, user-facing summary for a "Coming Soon" page.

- Explain what the feature is and the primary problem it solves.
- Describe 2-3 key benefits for the user.
- Maintain an optimistic and professional tone.
- Format the output as clean, readable HTML. Use a heading (<h3>), paragraphs (<p>), and a bulleted list (<ul> with <li> items) for the benefits. Do not include <html> or <body> tags.`;

    const contents = `PRODUCT REQUIREMENTS DOCUMENT (PRD):
---
${PRD_TEXT}
---
`;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: contents,
            config: {
                systemInstruction: systemInstruction,
            },
        });
        return response.text;
    } catch (error) {
        console.error(`Error generating feature summary for ${featureName}:`, error);
        return `An error occurred while generating the AI summary for ${featureName}. Please check the console for details.`;
    }
};
