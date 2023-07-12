import { client } from "@/utils/client";

export const POST = async (request: Request) => {
  const document = request.body;
  await client.create(document);

  return new Response("Successful creation", { status: 201 });
};
