import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({
  log: ["query"],
});

const app = express();
app.use(cors({
  origin:'http://localhost:5173'
}))
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/games", async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });
  return res.json(games);
});

app.get("/games/:id/ads", async (req, res) => {
  const gameId = req.params.id;

  const ads = await prisma.ad.findMany({
    where: {
      gameId,
    },
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourEnd: true,
      hourStart: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.json(
    ads.map((ad) => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(","),
      };
    })
  );
});

app.get("/ads/:id/discord", async (req, res) => {
  const adId = req.params.id;

  const ad = await prisma.ad.findFirstOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });

  return res.json({
    discord: ad.discord,
  });
});


app.post('/games/:id/ads', async (req, res) => {
    const gameId   = req.params.id;
    const { name, yearsPlaying, discord, weekDays, hourStart, hourEnd, useVoiceChannel } = req.body;
  
    const ads = await prisma.ad.create({
      data: {
        gameId,
        name: name,
        yearsPlaying:yearsPlaying,
        discord: discord,
        weekDays:weekDays,
        hourStart: parseFloat(hourStart),
        hourEnd: parseFloat(hourEnd),
        useVoiceChannel:useVoiceChannel,
        
      }
    })
 
    return res.status(201).json(ads)
  });


app.listen(process.env.PORT || 3333, () =>
  console.log(" Backend NLW Sports 🚀")
);
