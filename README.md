# Title & Description Generator (ChatGPT powered)

Ye tool transcript le kar OpenAI (ChatGPT) se AI-generated title aur description banata hai.
API key server-side (Vercel function) mein chupi rehti hai — browser mein kabhi expose nahi hoti.

## Files
- `public/index.html` — Frontend (jo user ko dikhta hai)
- `api/generate.js` — Backend serverless function (OpenAI ko yahan call kiya jata hai)
- `package.json` — Project config

## Deploy Karne Ka Tareeqa (Vercel — Free)

### Step 1: OpenAI API Key Banayein
1. https://platform.openai.com/api-keys par jayein
2. "Create new secret key" par click karein, key copy kar lein (ye sirf ek dafa dikhegi)
3. Billing setup karein: https://platform.openai.com/settings/organization/billing — kam se kam $5 add kar dein taake API kaam kare

### Step 2: GitHub Par Upload Karein
1. GitHub.com par naya repository banayein (public ya private, dono chalega)
2. In files ko us repo mein upload/push kar dein (`public/`, `api/`, `package.json`)

### Step 3: Vercel Se Connect Karein
1. https://vercel.com par jayein aur GitHub se sign up/login karein
2. "Add New Project" → apni GitHub repo select karein → "Import"
3. Deploy se pehle "Environment Variables" section mein ye add karein:
   - Name: `OPENAI_API_KEY`
   - Value: (aapki OpenAI key jo Step 1 mein banayi)
4. "Deploy" par click karein — 1-2 minute mein live ho jayega

### Step 4: Live Link
Deploy hone k baad Vercel aapko ek link dega jaisay:
`https://your-project-name.vercel.app`

Yehi link aap logon ko share kar saktay hain ya apni khud ki custom domain bhi attach kar saktay hain (Vercel Settings → Domains).

## Cost Ka Andaza
- `gpt-4o-mini` model use ho raha hai (sasta aur fast) — chhotay transcript par cost paisay ke barabar hoti hai (fraction of a rupee to a few rupees per generation depending on transcript length)
- Vercel hosting free hai chhoti scale (20-100 users) k liye
- Sirf OpenAI usage ka bill aayega — apna OpenAI dashboard (Usage tab) check karte rahein

## Instructions Kaise Kaam Karti Hain
- User pehli dafa "Instructions" panel mein apni instruction save karta hai — ye browser ki `localStorage` mein save hoti hai (har user ki apni alag, kisi database ki zaroorat nahi)
- Har transcript k sath yahi saved instruction automatically backend ko bhejti hai

## Model Change Karna Ho To
`api/generate.js` mein `model: "gpt-4o-mini"` ko `"gpt-4o"` ya kisi aur OpenAI model se replace kar saktay hain (behtar quality, zyada cost).
