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
  - **For iOS**: 
    - macOS (required for iOS development)
    - Xcode (latest version recommended)
    - Xcode Command Line Tools: `xcode-select --install`
    - CocoaPods: `sudo gem install cocoapods` (if not already installed)
    - iOS Simulator (comes with Xcode) or physical iOS device
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

### Run on iOS

Open a new terminal window and run:

```bash
npm run ios
# or
yarn ios
```

**Prerequisites:**
- Make sure you have Xcode installed and updated
- For first-time setup, you need to install CocoaPods dependencies:
  ```bash
  cd ios
  export LANG=en_US.UTF-8  # Fix encoding issues if needed
  pod install
  cd ..
  ```
- The app will automatically launch in the iOS Simulator (iPhone 16 Pro by default)
- To run on a specific simulator, use: `npm run ios -- --simulator="iPhone 15"`
- To run on a physical device, open `ios/MyAuthApp.xcworkspace` in Xcode and select your device

**Note:** Always use `MyAuthApp.xcworkspace` (not `.xcodeproj`) when opening the project in Xcode after running `pod install`.

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
├── __tests__/               # Test files
│   ├── App.test.tsx
│   ├── LoginScreen.test.tsx
│   └── SignupScreen.test.tsx
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
├── ios/                     # iOS native code
│   ├── MyAuthApp/          # iOS app source
│   ├── MyAuthApp.xcodeproj # Xcode project
│   ├── MyAuthApp.xcworkspace # Xcode workspace (use this after pod install)
│   └── Podfile             # CocoaPods dependencies
├── App.tsx                  # Root component
├── jest.config.js          # Jest configuration
├── jest.setup.js           # Jest setup file (mocks)
├── package.json            # Dependencies and scripts
└── README.md               # Project documentation
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
- **Jest** (^29.6.3): Testing framework with React Native preset
- **react-test-renderer** (19.1.1): Component testing utilities

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

## Testing

The project includes comprehensive Jest test suites for the Login and Signup screens.

### Test Setup

- **Jest** (^29.6.3): Testing framework
- **react-test-renderer** (19.1.1): React component testing utilities
- **@react-native-async-storage/async-storage/jest/async-storage-mock**: Mock for AsyncStorage in tests

### Test Files

- `__tests__/LoginScreen.test.tsx`: 10 test cases covering:
  - Component rendering
  - UI element display
  - Email validation (empty, invalid format)
  - Password validation (empty, too short)
  - Successful login flow
  - Navigation to Signup screen
  - Error clearing on retry

- `__tests__/SignupScreen.test.tsx`: 11 test cases covering:
  - Component rendering
  - UI element display
  - Name validation (empty)
  - Email validation (empty, invalid format)
  - Password validation (empty, too short)
  - Successful signup flow
  - Failed signup error handling
  - Navigation to Login screen
  - Error clearing on retry
  - Combined field validation

### Running Tests

Run all tests:
```bash
npm test
# or
yarn test
```

Run specific test files:
```bash
npm test -- __tests__/LoginScreen.test.tsx
npm test -- __tests__/SignupScreen.test.tsx
```

Run tests in watch mode:
```bash
npm test -- --watch
```

Run tests with coverage:
```bash
npm test -- --coverage
```

### Test Configuration

- **Jest Config**: `jest.config.js` - Uses `react-native` preset
- **Jest Setup**: `jest.setup.js` - Mocks AsyncStorage for testing
- **Test Environment**: Uses React 19's async `act()` API for proper state updates

### Test Coverage

The test suites validate:
- ✅ Form validation logic
- ✅ Error message display
- ✅ User interactions (button presses, input changes)
- ✅ Navigation flows
- ✅ Context integration (AuthContext)
- ✅ Component rendering

## Development

### Available Scripts

- `npm start` or `yarn start`: Start Metro bundler
- `npm run ios` or `yarn ios`: Build and run on iOS Simulator or device
- `npm run android` or `yarn android`: Build and run on Android device/emulator
- `npm test` or `yarn test`: Run Jest tests
- `npm run lint` or `yarn lint`: Run ESLint to check code quality

### Hot Reloading

The app supports Fast Refresh. When you save changes to your code:
- The app will automatically update
- State is preserved when possible
- For a full reload:
  - **iOS**: Press `Cmd + R` in the simulator or shake device and select "Reload"
  - **Android**: Press `R` twice

## Troubleshooting

### Common Issues

1. **Metro bundler issues**: 
   - Clear cache: `npm start -- --reset-cache`
   - Delete `node_modules` and reinstall

2. **iOS build issues**:
   - Install CocoaPods dependencies: `cd ios && pod install && cd ..`
   - If you get encoding errors, set: `export LANG=en_US.UTF-8` before running `pod install`
   - Clean build folder in Xcode: Product → Clean Build Folder (Shift + Cmd + K)
   - Delete derived data: `rm -rf ~/Library/Developer/Xcode/DerivedData`
   - Ensure you're using `MyAuthApp.xcworkspace` (not `.xcodeproj`) after running `pod install`
   - Check Xcode version compatibility with React Native 0.82.1
   - If simulator doesn't launch, try: `xcrun simctl list devices` to see available simulators

3. **Android build issues**:
   - Clean gradle: `cd android && ./gradlew clean && cd ..`
   - Check Android SDK and build tools versions
   - Ensure Android emulator is running or device is connected: `adb devices`

4. **Navigation issues**:
   - Ensure all dependencies are installed: `npm install`
   - Check that navigation is properly wrapped in NavigationContainer
   - Verify React Navigation dependencies are correctly linked

5. **TypeScript errors**:
   - Run `npm install` to ensure all type definitions are installed
   - Check `tsconfig.json` configuration

6. **AsyncStorage issues**:
   - Ensure `@react-native-async-storage/async-storage` is properly installed
   - For iOS, ensure CocoaPods dependencies are installed: `cd ios && pod install && cd ..`

7. **CocoaPods issues**:
   - Update CocoaPods: `sudo gem install cocoapods`
   - Clear CocoaPods cache: `pod cache clean --all`
   - Reinstall pods: `cd ios && rm -rf Pods Podfile.lock && pod install && cd ..`

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
