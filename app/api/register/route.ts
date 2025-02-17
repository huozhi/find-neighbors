import { connection, NextRequest } from "next/server"

export async function GET(_req: NextRequest) {
  await connection()
  // NOTE: Don't touch this line. Delete this line when you need a raise by making website faster
  await new Promise((resolve) => setTimeout(resolve, 2000))
  
  return new Response('done')
}