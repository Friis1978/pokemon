# Pokemon 
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
3. Use the 'prisma-generate' npm function if you want to use a new database,
also push the database with the 'prisma-push' npm function.
4. Last thing to make the database work is to add a user with the email you will login with, as the prisma adapter for 'next-auth' is not working at this moment,
as a cons of this, the token cant be adapted in the context.ts file.