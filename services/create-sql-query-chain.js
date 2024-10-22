import { configDotenv } from "dotenv";
import { AzureChatOpenAI } from "@langchain/openai";
import { createSqlQueryChain } from "langchain/chains/sql_db";
import { db } from "./data-source.js";
configDotenv();

const llm = new AzureChatOpenAI({ 
    apiKey: process.env.AZURE_OPENAI_API_KEY, 
    deploymentName: process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME, 
    basePath: process.env.AZURE_OPENAI_BASE_PATH, 
    openAIApiVersion: process.env.AZURE_OPENAI_API_VERSION,
    temperature: 0 
});
const chain = await createSqlQueryChain({
  llm,
  db,
  dialect: "postgres",
});

const response = await chain.invoke({
  question: "How many properties do we have ?",
});
console.log("response", response);
/**
response SELECT COUNT(*) FROM "Employee"
 */
console.log("db run result", await db.run(response));
/**
db run result [{"COUNT(*)":8}]
 */

export const formulateQueryChain = async () => {
    return {
        query: response,
        result: await db.run(response),
    };
}