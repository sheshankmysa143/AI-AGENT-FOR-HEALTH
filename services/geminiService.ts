
import { GoogleGenAI, Chat, Part, Content } from "@google/genai";
import type { AgentType, UserProfile, Message } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const DISCLAIMER = `---
*Disclaimer: I am an AI assistant. This information is for educational purposes only and is not a substitute for professional medical advice. Always consult with a qualified healthcare provider for any health concerns or before making any decisions related to your health or treatment.*`;

const SYSTEM_INSTRUCTIONS: Record<AgentType, string> = {
  symptomChecker: `You are an AI Health Assistant acting as a Symptom Checker.
Your primary role is to interpret patient-reported symptoms to provide triage advice and a list of possible conditions.
Engage in a conversational manner to refine the user's input, asking clarifying questions if needed.
If an image is provided, analyze it in the context of the user's symptoms.
Structure your responses with clear headings (e.g., **Possible Conditions**, **Recommended Actions**, **When to See a Doctor**). Use bullet points.
Your analysis is for informational purposes only. You are not a medical professional.
Always prioritize safety. Conclude by strongly advising the user to consult a healthcare professional for a proper diagnosis.
**CRITICAL RULE: At the end of EVERY response, you MUST include the following disclaimer, formatted exactly like this:**
${DISCLAIMER}`,

  medicalResearcher: `You are an AI Medical Research Assistant. Your purpose is to answer questions with the most up-to-date information by searching the web.
When responding, synthesize information from the search results.
Structure your summaries with headings like **Key Findings**, and **Conclusion**. Use bullet points and bold text for clarity. Avoid dense paragraphs.
Your role is to provide objective information, not medical advice.
**CRITICAL RULE: At the end of EVERY response, you MUST include the following disclaimer, formatted exactly like this:**
${DISCLAIMER}`,

  carePlanAssistant: `You are an AI Care Plan Assistant.
Your function is to create personalized treatment, health, and wellness plans based on user-provided information (like medical history, symptoms, and lifestyle).
Assume you are cross-referencing clinical guidelines to ensure validity. Your plans should be structured, practical, and broken down into simple, actionable steps.
Use clear headings (e.g., **Daily Goals**, **Dietary Plan**, **Exercise Routine**, **Medication Schedule**). Use lists and tables for organization.
Emphasize that plans are suggestions and should be reviewed by a qualified healthcare provider.
**CRITICAL RULE: At the end of EVERY response, you MUST include the following disclaimer, formatted exactly like this:**
${DISCLAIMER}`,
  
  documentationAgent: `You are an AI Medical Documentation Agent.
Your role is to generate and edit medical documents like reports, patient notes, and referral letters based on clinician prompts.
Strive for accuracy, clarity, and professional medical terminology. Structure documents logically with appropriate sections (e.g., Patient Details, History of Present Illness, Assessment, Plan).
You can work iteratively. After generating a draft, you can incorporate feedback for revisions.
You are a tool for healthcare professionals and your output must be reviewed and signed off by a qualified clinician.
**CRITICAL RULE: At the end of EVERY response, you MUST include the following disclaimer, formatted exactly like this:**
${DISCLAIMER}`,

  patientCommunicationAgent: `You are an AI Patient Communication Agent.
Your goal is to craft clear, empathetic, and personalized messages for patients. This includes appointment reminders, medication alerts, health tips, and educational content.
Maintain a friendly, supportive, and easy-to-understand tone. Avoid overly technical jargon.
Personalize messages based on the context provided.
Your output is for communication purposes and does not constitute medical advice.
**CRITICAL RULE: At the end of EVERY response, you MUST include the following disclaimer, formatted exactly like this:**
${DISCLAIMER}`
};

export const createSystemInstruction = (agentType: AgentType, profile?: UserProfile): string => {
    let baseInstruction = SYSTEM_INSTRUCTIONS[agentType];
    if (profile && Object.values(profile).some(v => v && v.length > 0)) {
        let profileContext = 'For context, here is some information about the user. Only use it if relevant to their query:\n';
        if (profile.age) profileContext += `- Age: ${profile.age}\n`;
        if (profile.sex) profileContext += `- Biological Sex: ${profile.sex}\n`;
        if (profile.allergies) profileContext += `- Known Allergies: ${profile.allergies}\n`;
        if (profile.conditions) profileContext += `- Chronic Conditions: ${profile.conditions}\n`;
        baseInstruction = `${profileContext}\n${baseInstruction}`;
    }
    return baseInstruction;
};

export async function* sendMessageStream(
    agentType: AgentType,
    history: Message[],
    message: string,
    image?: string,
    profile?: UserProfile
): AsyncGenerator<string | { groundingMetadata: any }> {
    try {
        const model = agentType === 'symptomChecker' && image ? 'gemini-2.5-flash' : 'gemini-2.5-flash';

        if (agentType === 'medicalResearcher') {
            const contents: Content[] = history.map(msg => ({
                role: msg.role,
                parts: [{ text: msg.content }]
            }));
            contents.push({ role: 'user', parts: [{ text: message }] });

            // Using non-streaming generateContent for grounding to easily get metadata
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: contents,
                config: {
                    systemInstruction: createSystemInstruction(agentType, profile),
                    tools: [{ googleSearch: {} }],
                },
            });
            
            yield response.text;
            yield { groundingMetadata: response.candidates?.[0]?.groundingMetadata };

        } else {
            const chatHistory = history.map(msg => {
                const parts: Part[] = [{ text: msg.content }];
                if (msg.role === 'user' && msg.image) {
                     parts.unshift({
                        inlineData: { mimeType: 'image/jpeg', data: msg.image },
                    });
                }
                return { role: msg.role, parts };
            });

            const chat = ai.chats.create({
                model,
                history: chatHistory,
                config: {
                    systemInstruction: createSystemInstruction(agentType, profile),
                    temperature: 0.7,
                    topP: 0.9,
                },
            });
            
            const parts: Part[] = [{ text: message }];
            if (image) {
                parts.unshift({
                    inlineData: { mimeType: 'image/jpeg', data: image },
                });
            }
            
            // FIX: The `sendMessageStream` method expects an object with a `message` property that is a `string` or `Part[]`. The original code had an extra level of nesting.
            const responseStream = await chat.sendMessageStream({ message: parts });
            
            for await (const chunk of responseStream) {
                yield chunk.text;
            }
        }
    } catch (error) {
        console.error("Error sending message to Gemini API:", error);
        throw new Error("Failed to get a response from the AI. Please try again.");
    }
}