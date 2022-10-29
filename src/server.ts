import express from "express";
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import { convertHourStringToMinutes } from "./utils/convert-hour-string-to-minutes";
import { convertMinutesToHoursString } from "./utils/convert-minutes-to-hours-string";
import uploads from "./uploads/upload";


const app = express()
app.use(express.json())
app.use(cors())
const prisma = new PrismaClient()




app.post('/attractions/:id/ads', uploads.single('logo'), async(req, res) => {
  const attractionsId =  req.params.id;
  const body = req.body;
  const ad = await prisma.ad.create({
    data: {
      attractionsId,
      name: body.name,
      location: body.location,
      logo: body.logo,
      instagram: body.instagram,
      weekDays: body.weekDays.join(','),
      hourStart: convertHourStringToMinutes(body.hourStart),
      hourEnd: convertHourStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    }
  })
  
  return res.json(ad);
})

app.use('/logo', express.static('uploads'))


app.get('/attractions', async (req, res) => {
  const attraction = await prisma.attractions.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        }
      }
    },
  })
  return res.json(attraction);
})

app.get('/attractions/:id/ads', async (req, res) => {
  const attractionsId = req.params.id;
  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      location: true,
      logo: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      attractionsId
    },
    orderBy: {
      creatAt: 'desc',
    }
  })

  return res.json(ads.map (ad => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      hourStart: convertMinutesToHoursString(ad.hourStart),
      hourEnd: convertMinutesToHoursString(ad.hourEnd),
    }
  }))
})
 
app.get('/ads/:id/instagram', async (req, res) => {
  const adId = req.params.id;
  const ad = await prisma.ad.findUniqueOrThrow({
    select: { 
      instagram: true,
      location: true,
    },
    where: {
      id: adId,
    }
  })

  return res.json({
    instagram: ad.instagram,
    location: ad.location,
  })
})
app.get('/ads/:id/location', async (req, res) => {
  const adId = req.params.id;
  const ad = await prisma.ad.findUniqueOrThrow({
    select: { 
      location: true,
      logo: true,
    },
    where: {
      id: adId,
    }
  })

  return res.json({
    location: ad.location,
    logo: ad.logo,
  })
})


app.listen(5000)


