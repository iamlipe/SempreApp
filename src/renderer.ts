import '.';
import { db } from "./presentation/utils/database-client";

db.createTableProposal()

console.log('👋 This message is being logged by "renderer.ts", included via Vite');
