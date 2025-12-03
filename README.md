# quickauth

A React Native authentication application with login, signup, and user session management features.
Video: https://github.com/lokeshdesai07/quickauth/tree/main/src/video

## Features

### 🔐 Authentication System
- **Login Screen**: Email and password authentication with comprehensive validation
- **Signup Screen**: User registration with name, email, and password fields
- **Session Persistence**: User authentication state is persisted using AsyncStorage, so users remain logged in after app restarts
- **Logout Functionality**: Secure logout that clears user session from both memory and storage
- **Context-Based State Management**: Authentication state managed globally using React Context API

### 📱 User Interface
- **Custom Components**:
  - `CustomTextInput`: Reusable text input component with optional password visibility toggle
  - `CustomButton`: Styled button component with customizable colors and text styles
  - `EyeIcon`: Password visibility toggle icon for secure password entry
- **Form Validation**: Real-time validation with clear error messages for:
  - Email format validation (regex: `/\S+@\S+\.\S+/`)
  - Password length requirements (minimum 6 characters)
  - Required field validation (name, email, password)
- **Keyboard Handling**: Optimized keyboard behavior for Android
- **Responsive Design**: Scrollable forms with KeyboardAvoidingView that adapt to different screen sizes
- **Color Scheme**: Consistent purple-themed color palette throughout the app

### 🧭 Navigation
- **Stack Navigation**: Implemented using React Navigation v7
- **Conditional Navigation**: 
  - Authenticated users automatically see the Home screen
  - Unauthenticated users see Login/Signup screens
  - Seamless navigation between Login and Signup screens
- **Loading State**: Shows loading message ("Waiting for your auth state...") while checking persisted authentication state on app startup
- **Safe Area Support**: Proper handling of device safe areas using react-native-safe-area-context

### 🏠 Home Screen
- Displays user information (name and email) in a styled card
- Conditional name display (only shows if name exists from signup)
- Logout button to securely end session

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 20 or higher) - Required by `package.json` engines
- **npm** or **yarn** package manager
- **React Native development environment** set up:
  - **For Android**: 
    - Android Studio
    - Android SDK (API level 21 or higher)
    - Android emulator or physical device with USB debugging enabled
- **Metro bundler** (comes with React Native)

For detailed environment setup, refer to the [React Native Environment Setup Guide](https://reactnative.dev/docs/set-up-your-environment).

## Installation

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd quickauth
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

## Running the App

### Start Metro Bundler

In the project root directory, run:

```bash
npm start
# or
yarn start
```

This will start the Metro bundler, which is the JavaScript build tool for React Native.

### Run on Android

Open a new terminal window and run:

```bash
npm run android
# or
yarn android
```

**Prerequisites:**
- Make sure you have an Android emulator running or a physical device connected via USB with USB debugging enabled
- For first-time setup, you may need to run `cd android && ./gradlew clean && cd ..` to ensure a clean build

## Project Structure

```
quickauth/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── CustomeButton.tsx
│   │   ├── CustomTextInput.tsx
│   │   └── EyeIcon.tsx
│   ├── constants/           # App constants
│   │   └── colors.ts
│   ├── context/             # React Context providers
│   │   └── AuthContext.tsx
│   ├── navigation/          # Navigation configuration
│   │   └── AppNavigator.tsx
│   └── screens/             # Screen components
│       ├── HomeScreen.tsx
│       ├── LoginScreen.tsx
│       └── SignupScreen.tsx
├── android/                 # Android native code
├── App.tsx                  # Root component
└── package.json            # Dependencies and scripts
```

## Key Technologies

- **React Native** (0.82.1): Cross-platform mobile framework
- **React** (19.1.1): UI library
- **TypeScript** (5.8.3): Type-safe JavaScript
- **React Navigation** (v7): Navigation library with stack navigator
- **@react-native-async-storage/async-storage** (^2.2.0): Local data persistence for user sessions
- **React Context API**: Global state management for authentication
- **react-native-safe-area-context**: Safe area handling for different device screens
- **react-native-gesture-handler**: Required dependency for React Navigation

## Authentication Flow

1. **App Initialization**: 
   - `AuthProvider` component loads and checks AsyncStorage for existing user session
   - Shows loading state ("Waiting for your auth state...") during check
   - Sets `isLoading` to `false` once check is complete

2. **Login Flow**:
   - User enters email and password on Login screen
   - Form validation runs on submit
   - If valid, `login()` function creates user object with email
   - User data is saved to AsyncStorage and state
   - Navigation automatically redirects to Home screen (via conditional rendering)

3. **Signup Flow**:
   - User enters name, email, and password on Signup screen
   - Form validation runs on submit
   - If valid, `signup()` function creates user object with name and email
   - User data is saved to AsyncStorage and state
   - Navigation automatically redirects to Home screen (via conditional rendering)

4. **Session Persistence**:
   - User data stored in AsyncStorage with key `@auth_user`
   - On app restart, persisted data is loaded automatically
   - User remains authenticated across app sessions

5. **Logout Flow**:
   - User clicks logout button on Home screen
   - `logout()` function clears user from state and AsyncStorage
   - Navigation automatically redirects to Login screen (via conditional rendering)

**Important**: This is a frontend-only authentication demo. In a production app, credentials should be validated against a backend server.

## Validation Rules

### Login Screen
- **Email**: 
  - Required field
  - Must match regex pattern: `/\S+@\S+\.\S+/`
  - Error message: "Missing email field." or "Invalid email format."
- **Password**: 
  - Required field
  - Minimum 6 characters
  - Error message: "Missing password field." or "Password must be at least 6 characters."

### Signup Screen
- **Name**: 
  - Required field (must not be empty after trimming)
  - Error message: "Missing name field."
- **Email**: 
  - Required field
  - Must match regex pattern: `/\S+@\S+\.\S+/`
  - Error message: "Missing email field." or "Invalid email format."
- **Password**: 
  - Required field
  - Minimum 6 characters
  - Error message: "Missing password field." or "Password must be at least 6 characters."

**Note**: All validation errors are displayed in real-time below the respective input fields in red text.

## Development

### Available Scripts

- `npm start` or `yarn start`: Start Metro bundler
- `npm run android` or `yarn android`: Build and run on Android device/emulator
- `npm test` or `yarn test`: Run Jest tests
- `npm run lint` or `yarn lint`: Run ESLint to check code quality

### Hot Reloading

The app supports Fast Refresh. When you save changes to your code:
- The app will automatically update
- State is preserved when possible
- For a full reload, press `R` twice (Android)

## Troubleshooting

### Common Issues

1. **Metro bundler issues**: 
   - Clear cache: `npm start -- --reset-cache`
   - Delete `node_modules` and reinstall

2. **Android build issues**:
   - Clean gradle: `cd android && ./gradlew clean && cd ..`
   - Check Android SDK and build tools versions
   - Ensure Android emulator is running or device is connected: `adb devices`

3. **Navigation issues**:
   - Ensure all dependencies are installed: `npm install`
   - Check that navigation is properly wrapped in NavigationContainer
   - Verify React Navigation dependencies are correctly linked

4. **TypeScript errors**:
   - Run `npm install` to ensure all type definitions are installed
   - Check `tsconfig.json` configuration

5. **AsyncStorage issues**:
   - Ensure `@react-native-async-storage/async-storage` is properly installed

## Code Structure Details

### Component Architecture
- **AuthContext**: Centralized authentication state management
  - Stores user data and loading state
  - Provides `login`, `signup`, and `logout` methods
  - Handles AsyncStorage persistence automatically

### Color Scheme
The app uses a purple-themed color palette defined in `src/constants/colors.ts`:
- Primary: `#663399` (purple)
- Primary Light variants for backgrounds
- Consistent color usage across all screens

### Navigation Structure
- Uses React Navigation Stack Navigator
- Conditional rendering based on authentication state
- No header on Login/Signup screens for cleaner UI
- Styled header on Home screen with purple background

## Future Enhancements

Potential improvements for the app:
- Backend API integration for real authentication
- Password strength indicator
- Biometric authentication (Fingerprint)
- Social login (Google, Facebook)
- Email verification
- Password reset functionality
- Remember me option
- Multi-language support (i18n)
- Dark mode support
- Form input animations and transitions
- Loading indicators during authentication
- Error handling for network requests

## License

This project is private and proprietary.

## Contributing

This is a private project. For questions or issues, please contact the project maintainer.
