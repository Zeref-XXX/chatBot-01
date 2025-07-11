import { GoogleGenAI } from "@google/genai"; 
 
 
// const apiKey =process.env.GEM; 
// const genAI = new GoogleGenAI({ apiKey: apiKey });

async function main(userIn) { 
  const input = userIn.message;
  const genAI = new GoogleGenAI({ apiKey: userIn.key   });


    if (input.toLowerCase() === "bye") { 
      return "Bye bey";
    }
    const response = await genAI.models.generateContent({
      model: "gemini-1.5-flash",
      // contents: input,
      contents:  [
      {
        role: "user",
        parts: [{ text: input }],
      }],
      config: {
        systemInstruction: "you are Nezuko anime freak who  have immense knowlege about it",
      },
    });

    const ans = response.text; 
    return ans; 

}
export default main; 