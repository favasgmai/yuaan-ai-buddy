# Yuaan AI Buddy 🤖

A mobile-friendly, parent-supervised voice chatbot with an illustrated Yuaan-inspired robot. English and Malayalam modes, browser speech recognition, browser text-to-speech, typed fallback, and a server-side Gemini API route.

## Deploy using GitHub + Vercel
1. Add the files and folders from this project to your GitHub repository. **Do not upload only the ZIP file**; GitHub does not automatically unpack ZIP archives.
2. In Vercel choose **Add New → Project → Import Git Repository**, select the repository, choose **Other** as the framework, and deploy.
3. In Vercel Project → Settings → Environment Variables add `GEMINI_API_KEY` with a **newly generated** API key (never add the key to GitHub). Redeploy after adding it.
4. Open the HTTPS deployment on Chrome on Android. Test typed chat first, then microphone and speech playback.

## Important
- A previously shared Gemini key should be revoked and replaced before use.
- Gemini usage/age restrictions and parental consent requirements should be reviewed before use by a child; the parent must supervise.
- Browser voice recognition and Malayalam speech synthesis depend on OS/browser language support. Some devices may have no Malayalam voice or transcription support; text chat remains available.
- Public GitHub repositories expose the code and illustration. Change repository to private if you prefer not to publish your child's likeness.
- Free Vercel hosting does not guarantee free AI API usage.
- No audio recordings or chat transcripts are stored by this app. Requests are sent to the selected AI provider to generate responses.
