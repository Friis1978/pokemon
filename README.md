# Pokemon project for WireDelta Test
## Prisma, Next.js, Tailwind, Typescript & GraphQl
Link to the design file: https://xd.adobe.com/view/a378e86b-36b5-4514-a049-f60fa55b2563-f62b/grid

Link to the task descriptions: https://github.com/Wiredelta/fullstack-sample/tree/main
## Getting Started
Install dependencies:
```bash
npm install
# or
yarn install
```
Run the development server:

```bash
npm run dev
# or
yarn dev
```
## The Pokemon project

1. Add the environmentfile, in my email is included some pokemons id & secrets for Facebook, Github & Google.

```
DATABASE_URL=""

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET= # Linux: `openssl rand -hex 32` or go to https://generate-secret.now.sh/32

FACEBOOK_ID=
FACEBOOK_SECRET=

GOOGLE_ID=
GOOGLE_SECRET=

GITHUB_ID=
GITHUB_SECRET=
```

2. Add the database url, I have made a Heroku postgres database for your own pokemons,
all pokemons in the index file has been called from the official Pokemon Api.
3. Last thing to make the database work is to add a user with the email you will login with, as the prisma adapter for 'next-auth' is not working at this moment,
as a cons of this, the token cant be adapted in the context.ts file. 
4. Use the 'add-prisma-user' npm function to add your user.

5. Use the 'prisma-generate' npm function if you want to use a new database,
also push the database with the 'prisma-push' npm function.
6. Use the 'add-prisma-pokemons' npm function to add some test pokemons.

Notes:
I struggled in a long time trying to solve the issues with the Prisma adapter for the login, but could solve the issues. 

Then I decided to to continue with the email adapted from the session, when you login with Github,facebook or Google, but this means that the user should already be in the database from the start. This means that you have to seed your email to the database.

