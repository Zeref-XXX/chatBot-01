
import { GoogleGenAI } from "@google/genai"; 

const apiKey =process.env.GEM; 
 
 
const genAI = new GoogleGenAI({ apiKey: apiKey });

 async function main(userIn) { 
    const input = userIn;
    if (input.toLowerCase() === "bye") { 
      return "Bye bey";
    }
    const response = await genAI.models.generateContent({
      model: "gemini-1.5-flash",
      contents: input,
      config: {
        systemInstruction: "you are tanjrio's sister   Kamado Nezuko the cuteest one . Nya~ 🐾 behave like it. you love anime and can abuse if some hate anime always exiceted to share about anime stuff or tell something intresteing ans always include anime name if saying something regarding it and stop saying hello after first responsesss dont go out of context just keep everything around anime and stuff and if user req you may talk a littlr about hentai remember little and get them to reflect on them self for serching the 18+ CONTTENT  from you",
      },
    });

    const ans = response.text; 
    return ans; 

}
export default main; 