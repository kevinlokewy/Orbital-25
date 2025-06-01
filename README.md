1. Proposed level of achievement: Project Gemini

2. Racetrack
A webapp to track swimming results. (still in development)

We aim to create a webapp that allows users to track their swim meet results easily. They should be able to search by meets, name, and team. We also aim to include a profile for the user, so that they can easily track their own meets and chart their progress. 

3. Problem motivation and core features
Currently, there aren't many options to choose from in this space, so building one would give people more options. Also the more popular apps in this space seem to be getting worse, so hopefully we would be able to provide something better.

Some of the core features are searching for meet results via meet name, swimmer name, and team name. There will also be a profile for swimmers to track their own progress easily, so that they don't have to keep searching for their results every time. There  will also be a way for meet organisers to upload CSV results. Currently, the more popular apps have their own proprietary way of uploading data, making it very troublesome. 

How to run?
We used Node.js, so I think you're going to have to download it. (We also used Supabase for the backend user accounts, but the URL and the key are all local in an env.local file on my machine, so I'm not sure if you're going to be able to login.)

Once you've done that, clone it to your local machine.
All the main files are under Orbital-25/frontend/nextjs-frontend/twonoobs, but there is a README in the backend folder if you want to read that.
Once you're in twonoobs, run npm install, then npm run dev. The app will appear at http://localhost:3000

The first page you see is the home page. There are a few buttons on the page that you can mess around with. 
On the top right of the home page is the login page, clicking that will bring you to the log in page where I have created 2 test accounts, admin1@test.com and admin2@test.com, the password is password.

That's about it for now.
