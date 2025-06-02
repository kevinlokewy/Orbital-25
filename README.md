How to run?
We used Node.js, so I think you're going to have to download it. Then clone the repository to your local machine.

We also used Supabase for the backend user accounts, so you're going to have to create a free supabase account and upload test users by yourself. Once you've created a project in Supabase, go to authentication -> users, then create a test user. Then under configuration, go to sign in/providers -> email -> disable confirm email. Once you've done that, you have to create a .env.local file in the twonoobs folder with two things, NEXT_PUBLIC_SUPABASE_URL= your_url and NEXT_PUBLIC_SUPABASE_KEY=your_key. To get the URL and key, in Supabase, go to Project settings -> Data API for the URL, then go to API keys still under Project settings to get the key.

All the main files are under Orbital-25/frontend/nextjs-frontend/twonoobs, but there is a README in the backend folder if you want to read that.
Once you're in twonoobs, run npm install, then npm run dev. The app will appear at http://localhost:3000

The first page you see is the home page. There are a few buttons on the page that you can mess around with. 
On the top right of the home page is the login page, clicking that will bring you to the log in page where you can test your test user accounts.

That's about it for now.
