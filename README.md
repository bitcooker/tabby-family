This app is a tiny part of ERP system of TABBY ML built by `Next v13.4(latest version)` & `Tailwind CSS`.

## Core functionalities

1. Display all employees
2. Implement dynamic routings to display each one
3. Implement `ADD` `EDIT` `DELETE` features
4. Filter by name feature

## How to install and run app locally

1. prerequests
   - you should install node v16 or higher
   - you should install mysql server locally
2. setup
   - you should get a copy of `.env.example`. please run `cp .env.example .env`
   - then you should set the `DATABASE_URL` env with your local mysql config values. `e.g. DATABASE_URL="mysql://root:password@localhost:3306/tabby"`
   - you should just install node modules. please run `npm i` or `yarn install`
   - and then you might want to migrate the database and proceed seeding. like this `npx prisma migrate dev` and then `npx prisma db seed`
   - then you just run `npm run dev` or `yarn dev` and just visit `http://localhost:3000` Yay! there we go!!!
## Database Achitecture

- you might want to take a look at this file... `/prisma/schema.prisma`

If you have any questions and find any problems, just come up with them.

Thanks
