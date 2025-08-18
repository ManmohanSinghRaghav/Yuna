# Yuna Frontend - React Anime List Manager

This is the frontend application for the Yuna anime list manager, built with React, Vite, and Firebase.

## 🚀 Features

- 🎌 **Modern React App** - Built with React 19 and Vite for fast development
- 🔐 **Firebase Authentication** - Secure user authentication
- 📊 **Real-time Data** - Firebase Firestore integration
- 📱 **Responsive Design** - Works on desktop and mobile
- ⚡ **Fast Development** - Hot module replacement with Vite

## 📋 Setup Instructions

### 1. Environment Configuration

Create a `.env` file in the root directory with your Firebase configuration:

```env
VITE_API_KEY=your-api-key
VITE_AUTH_DOMAIN=your-auth-domain
VITE_PROJECT_ID=your-project-id
VITE_STORAGE_BUCKET=your-storage-bucket
VITE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_APP_ID=your-app-id
VITE_MEASUREMENT_ID=your-measurement-id
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   └── AuthStatus.jsx   # Authentication status display
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── animeService.js     # Firebase Firestore operations
├── authService.js      # Firebase Authentication
├── firebaseConfig.js   # Firebase configuration
├── App.jsx            # Main application component
├── main.jsx           # Application entry point
└── index.css          # Global styles
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🛠 Technology Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Firebase** - Backend services
  - Authentication (Email/Password)
  - Firestore Database
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests

## 📊 Firebase Services

### Authentication
- Email/password authentication
- Real-time auth state management
- Automatic token refresh

### Firestore Database
- Real-time data synchronization
- Secure access rules
- Offline support

## 🎨 Styling

- CSS3 with CSS custom properties
- Dark/light mode support
- Responsive grid layouts
- Smooth transitions and animations

## 🔐 Security

- Environment variables for sensitive data
- Firebase security rules
- Authentication required for data access
- Client-side route protection

## 📱 Components (Coming Soon)

- **Login/Register Forms** - User authentication UI
- **Anime List** - Display user's anime collection
- **Anime Search** - Search and add new anime
- **Profile Management** - User profile settings
- **Dashboard** - Overview and statistics

## 🔄 State Management

Currently using React's built-in state management:
- `useState` for component state
- `useEffect` for side effects
- Context API for global state (planned)

## 🌟 Planned Features

- [ ] Login/Register components
- [ ] Anime search and add functionality
- [ ] Anime list with CRUD operations
- [ ] User profile management
- [ ] Anime status tracking (Watching, Completed, etc.)
- [ ] Rating and review system
- [ ] Statistics and progress tracking
- [ ] Import/export functionality
- [ ] Social features (sharing lists)

## 🚀 Development Workflow

1. **Start development server**: `npm run dev`
2. **Make changes** to components in `src/`
3. **Test in browser** - changes are reflected immediately
4. **Build for production**: `npm run build`
5. **Preview production build**: `npm run preview`

## 🔍 Troubleshooting

### Common Issues

1. **Firebase Connection Issues**
   - Check `.env` file has correct Firebase config
   - Ensure Firebase project has correct domain whitelist
   - Verify API keys are active

2. **Build Errors**
   - Run `npm run lint` to check for code issues
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`

3. **Hot Reload Not Working**
   - Check if files are saved
   - Restart dev server: `Ctrl+C` then `npm run dev`

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vite.dev/guide/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
