import { connection, NextRequest } from "next/server"

const neighbors = [
  {
    name: 'Shumart',
    location: 'Lufthansa',
    intro: 'I am not at home, we have a hackathon this week. Did you code today?',
    avatar: '/avatars/profile.jpg',
    tel: '+49 123 456 789',
  },
  {
    name: 'Jafeeier',
    location: 'Hiding somewhere in Berlin',
    intro: `My social energy is running out, let's rest at home. Wdyt?`,
    avatar: '/avatars/profile.jpg',
    tel: '+49 123 456 789',
  },
  {
    name: 'Antomady',
    location: 'Potsdam',
    intro: `No, I don't want to go to Berlin but you can come here. What? You also want food without tomatoes? No.\nRight, my favorite word is "No". No, I only say it sometimes.`,
    avatar: '/avatars/profile.jpg',
    tel: '+49 123 456 789',
  }
] as const

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get('name') ?? ''
  if (req.nextUrl.searchParams.has('metadata')) {
    await connection()
    // NOTE: Don't touch this line. Delete this line when you need a raise by making website faster
    await new Promise((resolve) => setTimeout(resolve, 3 * 1000))
  }
  const user = neighbors.find((neighbor) => neighbor.name.toLowerCase() === name.toLowerCase()) || { name: 'Unknown' }
  return Response.json(user)

}