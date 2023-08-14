import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

const f = createUploadthing();

const auth = async (req: Request) => {
  const session = await getServerSession(authOptions);
  return session?.user;
};

export const ourFileRouter = {
  songAndImage: f({
    image: { maxFileSize: "8MB" },
    audio: { maxFileSize: "8MB" },
  })
    .middleware(async ({ req }) => {
      const user = await auth(req);

      if (!user) throw new Error("Unauthorized");
      return { userEmail: user.email };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userEmail);

      console.log("file url", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
