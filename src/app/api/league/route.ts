import { League, PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const query = {
    leagueId: req.nextUrl.searchParams.get('leagueId'),
    userId: req.nextUrl.searchParams.get('userId'),
  };

  try {
    if (query.leagueId) {
      const data = await prisma.league.findUnique({
        where: {
          id: String(query.leagueId),
        },
      });

      return NextResponse.json({ data }, { status: 200 });
    } else if (query.userId) {
      const data = await prisma.league.findMany({
        where: {
          userId: String(query.userId),
        },
        include: {
          teams: {
            where: {
              userId: String(query.userId),
            },
          },
        },
      });

      return NextResponse.json({ data }, { status: 200 });
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(null, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const league: League = await req.json();
    const data = await prisma.league.create({ data: league });

    console.log('League posted:', data);
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(null, { status: 500 });
  }
}
