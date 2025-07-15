# Firebase Setup Guide for Focused Mastery

This guide will help you set up Firebase for enhanced progress tracking, user authentication, and cross-device sync in the Focused Mastery application.

## Prerequisites

- A Google account
- Basic familiarity with Firebase console
- Node.js development environment

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project" or "Add project"
3. Enter project details:
   - **Project name**: "Focused Mastery" or similar
   - **Google Analytics**: Optional (recommended for usage insights)
   - **Analytics location**: Select your region
4. Click "Create project"

## Step 2: Configure Firebase App

1. In your Firebase project console, click "Add app" and select "Web" (</> icon)
2. Enter app details:
   - **App nickname**: "Focused Mastery Web"
   - **Firebase Hosting**: Check this box if you plan to deploy to Firebase Hosting
3. Click "Register app"
4. Copy the Firebase configuration object - you'll need these values later

## Step 3: Enable Required Services

### Firestore Database
1. Go to **Firestore Database** in the Firebase console
2. Click "Create database"
3. Choose **Start in test mode** (you can configure security rules later)
4. Select your preferred location
5. Click "Done"

### Authentication (Skip - Not Needed)
**Note**: This application uses automatic anonymous user IDs and does not require Firebase Authentication. You can skip the authentication setup entirely.

## Step 4: Configure Security Rules

### Firestore Security Rules
1. Go to **Firestore Database** > **Rules**
2. Replace the default rules with these **anonymous-friendly** rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // User profiles - allow access for anonymous users
    // Users can only access their own data using their unique ID
    match /userProfiles/{userId} {
      allow read, write: if userId.matches('anon_[a-f0-9]{32}');
    }
    
    // Content progress - allow access for anonymous users
    // Users can only access their own progress data
    match /contentProgress/{progressId} {
      allow read, write: if progressId.matches('anon_[a-f0-9]{32}_.*');
    }
    
    // Study sessions - allow access for anonymous users
    match /studySessions/{sessionId} {
      allow read, write: if sessionId.matches('anon_[a-f0-9]{32}_.*');
    }
  }
}
```

**Important**: These rules allow access to anonymous users with properly formatted IDs. The app automatically generates secure anonymous IDs that match this pattern.

3. Click "Publish"

## Step 5: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your Firebase configuration:
   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-your-measurement-id
   ```

## Step 6: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open the app in your browser
3. Navigate through some content and check progress tracking
4. In Firebase console, go to **Firestore Database** and verify that data is being created in:
   - `userProfiles` collection
   - `contentProgress` collection

## Features Enabled by Firebase

### With Firebase Configured:
- ✅ **Cross-device sync**: Progress saved across devices using unique anonymous IDs
- ✅ **No authentication required**: Automatic anonymous user ID generation
- ✅ **Real-time sync**: Progress syncs automatically every 30 seconds
- ✅ **Data backup**: Automatic cloud backup of progress
- ✅ **Privacy-focused**: No personal information required or stored
- ✅ **Offline support**: Works offline with automatic sync when online

### Without Firebase (localStorage fallback):
- ✅ **Local progress**: Progress saved locally in browser
- ✅ **Basic functionality**: All core features work
- ❌ **Cross-device sync**: Progress doesn't sync across devices
- ❌ **Data backup**: Progress lost if browser data is cleared

## Data Structure

### Collections Created
- **userProfiles**: User preferences and overall statistics
- **contentProgress**: Detailed progress for each piece of content
- **studySessions**: Session-level analytics and learning patterns

### Automatic Features
- **Progress migration**: Existing localStorage progress is automatically migrated
- **Conflict resolution**: Handles concurrent updates across devices
- **Data validation**: Ensures data integrity with TypeScript types
- **Error handling**: Graceful fallback to localStorage on errors

## Development with Firebase Emulator (Optional)

For local development without affecting production data:

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Initialize Firebase in your project:
   ```bash
   firebase init
   ```

3. Start the emulator:
   ```bash
   firebase emulators:start
   ```

4. Set environment variable:
   ```env
   NEXT_PUBLIC_USE_FIREBASE_EMULATOR=true
   ```

## Deployment

### Firebase Hosting (Recommended)
1. Build your app:
   ```bash
   npm run build
   ```

2. Deploy to Firebase:
   ```bash
   firebase deploy
   ```

### Other Hosting Providers
Firebase works with any hosting provider. Just ensure your environment variables are configured correctly.

## Monitoring & Analytics

### Firebase Analytics
- User engagement metrics
- Learning session analytics
- Content completion rates
- Device and browser statistics

### Custom Events
The app automatically tracks:
- Content access and completion
- Time spent on problems
- Learning patterns and preferences
- Error rates and performance metrics

## Security Best Practices

1. **Environment Variables**: Never commit `.env.local` to version control
2. **Security Rules**: Regularly review and update Firestore security rules
3. **Authentication**: Use strong authentication methods for sensitive data
4. **Data Validation**: Validate all data on both client and server side

## Troubleshooting

### "Firebase not configured" in console
- Check that all environment variables are set correctly
- Ensure you've copied `.env.example` to `.env.local`
- Restart your development server after changing environment variables

### Authentication errors
- Verify your Firebase project configuration
- Check that authentication providers are enabled in Firebase console
- Ensure security rules allow the operations you're performing

### Data not syncing
- Check the browser console for error messages
- Verify your internet connection
- Check Firebase console logs for any server-side errors

### Performance issues
- Monitor Firebase usage in the console
- Consider implementing data pagination for large datasets
- Use Firebase Performance Monitoring for detailed insights

## Support

- **Firebase Documentation**: [firebase.google.com/docs](https://firebase.google.com/docs)
- **Firebase Community**: [firebase.googleblog.com](https://firebase.googleblog.com)
- **Focused Mastery Issues**: Check this repository's GitHub issues