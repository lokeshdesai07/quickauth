/**
 * @format
 */

import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';
import { Text, TextInput } from 'react-native';
import LoginScreen from '../src/screens/LoginScreen';
import { AuthContext } from '../src/context/AuthContext';

// Mock navigation
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  reset: jest.fn(),
} as any;

// Mock AuthContext
const mockLogin = jest.fn();
const mockAuthContextValue = {
  user: null,
  isLoading: false,
  login: mockLogin,
  signup: jest.fn(),
  logout: jest.fn(),
};

describe('LoginScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', async () => {
    let tree: any;
    await act(async () => {
      tree = ReactTestRenderer.create(
        <AuthContext.Provider value={mockAuthContextValue}>
          <LoginScreen navigation={mockNavigation} />
        </AuthContext.Provider>
      ).toJSON();
    });
    expect(tree).toMatchSnapshot();
  });

  it('displays all UI elements', async () => {
    let instance: ReactTestRenderer.ReactTestRenderer;
    await act(async () => {
      instance = ReactTestRenderer.create(
        <AuthContext.Provider value={mockAuthContextValue}>
          <LoginScreen navigation={mockNavigation} />
        </AuthContext.Provider>
      );
    });

    const root = instance!.root;
    
    // Check for title
    const titleElements = root.findAllByType(Text).filter(
      (element: any) => element.props.children === 'MyAuthApp'
    );
    expect(titleElements.length).toBeGreaterThan(0);

    // Check for description
    const descriptionElements = root.findAllByType(Text).filter(
      (element: any) => element.props.children === 'Please enter your email and password to login'
    );
    expect(descriptionElements.length).toBeGreaterThan(0);

    // Check for Login subtitle
    const loginSubtitleElements = root.findAllByType(Text).filter(
      (element: any) => element.props.children === 'Login'
    );
    expect(loginSubtitleElements.length).toBeGreaterThan(0);
  });

  it('shows email error when email is empty', async () => {
    let instance: ReactTestRenderer.ReactTestRenderer;
    await act(async () => {
      instance = ReactTestRenderer.create(
        <AuthContext.Provider value={mockAuthContextValue}>
          <LoginScreen navigation={mockNavigation} />
        </AuthContext.Provider>
      );
    });

    const root = instance!.root;
    const loginButton = root.findAllByProps({ text: 'Login' })[0];
    
    // Trigger login with empty email
    await act(async () => {
      loginButton.props.onPress();
    });

    // Check for error message
    const errorTexts = root.findAllByType(Text).filter(
      (element: any) => element.props.children === 'Missing email field.'
    );
    expect(errorTexts.length).toBeGreaterThan(0);
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('shows email error when email format is invalid', async () => {
    let instance: ReactTestRenderer.ReactTestRenderer;
    await act(async () => {
      instance = ReactTestRenderer.create(
        <AuthContext.Provider value={mockAuthContextValue}>
          <LoginScreen navigation={mockNavigation} />
        </AuthContext.Provider>
      );
    });

    const root = instance!.root;
    const textInputs = root.findAllByType(TextInput);
    
    // Set invalid email
    await act(async () => {
      textInputs[0].props.onChangeText('invalid-email');
    });
    
    const loginButton = root.findAllByProps({ text: 'Login' })[0];
    await act(async () => {
      loginButton.props.onPress();
    });

    // Check for error message
    const errorTexts = root.findAllByType(Text).filter(
      (element: any) => element.props.children === 'Invalid email format.'
    );
    expect(errorTexts.length).toBeGreaterThan(0);
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('shows password error when password is empty', async () => {
    let instance: ReactTestRenderer.ReactTestRenderer;
    await act(async () => {
      instance = ReactTestRenderer.create(
        <AuthContext.Provider value={mockAuthContextValue}>
          <LoginScreen navigation={mockNavigation} />
        </AuthContext.Provider>
      );
    });

    const root = instance!.root;
    const textInputs = root.findAllByType(TextInput);
    
    // Set valid email but empty password
    await act(async () => {
      textInputs[0].props.onChangeText('test@example.com');
    });
    
    const loginButton = root.findAllByProps({ text: 'Login' })[0];
    await act(async () => {
      loginButton.props.onPress();
    });

    // Check for error message
    const errorTexts = root.findAllByType(Text).filter(
      (element: any) => element.props.children === 'Missing password field.'
    );
    expect(errorTexts.length).toBeGreaterThan(0);
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('shows password error when password is too short', async () => {
    let instance: ReactTestRenderer.ReactTestRenderer;
    await act(async () => {
      instance = ReactTestRenderer.create(
        <AuthContext.Provider value={mockAuthContextValue}>
          <LoginScreen navigation={mockNavigation} />
        </AuthContext.Provider>
      );
    });

    const root = instance!.root;
    const textInputs = root.findAllByType(TextInput);
    
    // Set valid email but short password
    await act(async () => {
      textInputs[0].props.onChangeText('test@example.com');
      textInputs[1].props.onChangeText('12345'); // Less than 6 characters
    });
    
    const loginButton = root.findAllByProps({ text: 'Login' })[0];
    await act(async () => {
      loginButton.props.onPress();
    });

    // Check for error message
    const errorTexts = root.findAllByType(Text).filter(
      (element: any) => element.props.children === 'Password must be at least 6 characters.'
    );
    expect(errorTexts.length).toBeGreaterThan(0);
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('calls login function with valid credentials', async () => {
    mockLogin.mockReturnValue(true);
    
    let instance: ReactTestRenderer.ReactTestRenderer;
    await act(async () => {
      instance = ReactTestRenderer.create(
        <AuthContext.Provider value={mockAuthContextValue}>
          <LoginScreen navigation={mockNavigation} />
        </AuthContext.Provider>
      );
    });

    const root = instance!.root;
    const textInputs = root.findAllByType(TextInput);
    
    // Set valid email and password
    await act(async () => {
      textInputs[0].props.onChangeText('test@example.com');
      textInputs[1].props.onChangeText('password123');
    });
    
    const loginButton = root.findAllByProps({ text: 'Login' })[0];
    await act(async () => {
      loginButton.props.onPress();
    });

    expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  it('navigates to Signup screen when "Go to Signup" button is pressed', async () => {
    let instance: ReactTestRenderer.ReactTestRenderer;
    await act(async () => {
      instance = ReactTestRenderer.create(
        <AuthContext.Provider value={mockAuthContextValue}>
          <LoginScreen navigation={mockNavigation} />
        </AuthContext.Provider>
      );
    });

    const root = instance!.root;
    const signupButton = root.findAllByProps({ text: 'Go to Signup' })[0];
    
    await act(async () => {
      signupButton.props.onPress();
    });

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Signup');
  });

  it('clears errors when login is attempted again', async () => {
    let instance: ReactTestRenderer.ReactTestRenderer;
    await act(async () => {
      instance = ReactTestRenderer.create(
        <AuthContext.Provider value={mockAuthContextValue}>
          <LoginScreen navigation={mockNavigation} />
        </AuthContext.Provider>
      );
    });

    const root = instance!.root;
    const loginButton = root.findAllByProps({ text: 'Login' })[0];
    
    // First attempt with empty fields
    await act(async () => {
      loginButton.props.onPress();
    });
    
    // Set valid credentials
    const textInputs = root.findAllByType(TextInput);
    await act(async () => {
      textInputs[0].props.onChangeText('test@example.com');
      textInputs[1].props.onChangeText('password123');
    });
    
    // Second attempt
    await act(async () => {
      loginButton.props.onPress();
    });

    // Errors should be cleared and login should be called
    expect(mockLogin).toHaveBeenCalled();
  });
});

