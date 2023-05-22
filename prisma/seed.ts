import { PrismaClient } from "@prisma/client";
import { announcements } from "./data";

const prisma = new PrismaClient()

const load = async () => {
    await prisma.announcement.createMany({
        data: announcements
    })

    console.log("A dummy data created!")
}

load()