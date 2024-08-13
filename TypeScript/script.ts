import { PrismaClient } from '@prisma/client/edge';
const prisma = new PrismaClient();

async function main() {
    try 
    {
        const user = await prisma.user.create({ data: { name: "Mads" } });
        console.log(user);
    } 
    
    catch (e) 
    {
        if (e instanceof Error) 
        {
            console.error(e.message);
        } 
        
        else 
        {
            console.error("An unexpected error occurred:", e);
        }
    } 
    
    finally 
    {
        await prisma.$disconnect();
    }
}

main()
    .catch(e => 
    {
        console.error("Failed to run the script:", e);
    });