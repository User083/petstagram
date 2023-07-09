import { client } from "@/utils/client";
import { allPostsQuery } from "@/utils/queries";

export async function GET(request : Request)
{
    const query = allPostsQuery();
    const data = await client.fetch(query);
    return new Response(JSON.stringify(data))
}