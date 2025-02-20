import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github"
import db from "@repo/db/client";
import bcrypt from "bcrypt"
import prisma from "@repo/db/client";
// type creadendialType={
//   number: string,
//   password:string 
// }
enum AuthType {
  Google ="Google",
  Github="Github",
  Credentials="Credentials",
}
export const authOptions = {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials:{
          number:{label: "Phone Number", type: "text"},
          password:{label: "Password", type: "password"}
        },
        async authorize(credentials:any) {
          if(!credentials.number || !credentials.password){
            throw new Error("Phone and password are required.")
          }
          const hashedPassword = await bcrypt.hash(credentials.password, 10);
          const existingUser = await db.merchant.findFirst({
            where: {
              number: credentials.number
            }
          });
          console.log(existingUser)
          if (existingUser) {
            console.log("User alredy exists")
            const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
            if (passwordValidation) {
                return {
                    id: existingUser.id.toString(),
                    name: existingUser.name,
                    number: existingUser.number
                }
            }
            return null;
          }
          try {
            const user = await db.merchant.create({
                data: {
                    number: credentials.number,
                    password: hashedPassword,
                }
            });
            console.log("User Created")
            return {
                id: user.id.toString(),
                name: user.name,
                email: user.number
            }
          } catch(e) {
            console.error(e);
          }
          return null
        }
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
      }),
      GitHubProvider({
        clientId: process.env.GITHUB_CLIENT_ID || "",
        clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      })
    ],
    callbacks: {
      async signIn({ user, account }:any) {
        console.log(process.env.DATABASE_URL)
        if (!user) return false;
        const authTypeEnum = (account.provider as string)?.toLowerCase();
        const validAuthType = authTypeEnum === "google"? AuthType.Google: authTypeEnum === "github"? AuthType.Github: AuthType.Credentials;
        
        if (account.provider !== "credentials") {
          await prisma.merchant.upsert({
            where: { number: user.email },
            update: { name: user.name, auth_type: account.provider },
            create: { password:user.password,number:user.number, auth_type: validAuthType, balance:{create:{amount:0,locked:0}} },
          });
        }
        return true;
      },
      async session({ token, session }: any) {
        session.user.id = token.sub
        return session
      }
    },
    secret: process.env.NEXTAUTH_SECRET 
  }
  