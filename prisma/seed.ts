/* eslint-disable no-console */
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

async function generateAdmin() {
  const password = "fL?tzL6Q4<H5";

  const user = await prismaClient.user.create({
    data: {
      name: "Admin",
      email: "admin@orange.com",
      password: bcrypt.hashSync(password, 10),
    },
  });

  console.log({ message: "Admin was created with success!", user });
  console.log("Password: ", password);
}

(async function main() {
  try {
    const handlePopulate = {
      Admin: generateAdmin,
    };

    (["Admin"] as (keyof typeof handlePopulate)[]).forEach((key) =>
      handlePopulate[key as keyof typeof handlePopulate]().catch((error) => {
        console.log(
          `🆘 \t file: seed.ts:99 \t main \t key: ${key} \t error:`,
          error
        );
      })
    );
  } catch (e) {
    console.log(e);
    process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
})();