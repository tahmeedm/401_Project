import { ChatGoogleGenerativeAI } from "@langchain/google-genai";


export async function getPersonalizedAdvice(userData) {
    const model = new ChatGoogleGenerativeAI({
        model: "gemini-2.0-flash-lite",
        apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        maxOutputTokens: 10 // TODO: adjust based on your needs
    });
    const { age, gender, height, weight, activityLevel, goals, dietaryPreferences, allergies, physicalConditions } = userData;

    const prompt = `
    Given the following user profile:
    - Age: ${age}
    - Gender: ${gender}
    - Height: ${height} cm
    - Weight: ${weight} kg
    - Activity Level: ${activityLevel}
    - Goals: ${goals}
    - Dietary Preferences: ${dietaryPreferences}
    - Allergies: ${allergies}
    - Physical Conditions: ${physicalConditions}

    Provide a personalized health and nutrition recommendation.
  `;

    try {
        console.log("Invoking model...");
        const response = await model.invoke(prompt);
        console.log("Response:", response);
        return response;
    } catch (error) {
        console.error("Error fetching response:", error);
        return null;
    }
}

