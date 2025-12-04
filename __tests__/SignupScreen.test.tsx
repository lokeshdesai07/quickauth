/**
 * @format
 */

import React from 'react';
import ReactTestRenderer, { act, create } from 'react-test-renderer';
import { Text, TextInput } from 'react-native';
import SignupScreen from '../src/screens/SignupScreen';
import { AuthContext } from '../src/context/AuthContext';

// Mock navigation
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  reset: jest.fn(),
} as any;

// Mock AuthContext
const mockSignup = jest.fn();
const mockAuthContextValue = {
  user: null,
  isLoading: false,
  login: jest.fn(),
  signup: mockSignup,
  logout: jest.fn(),
};

describe('SignupScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', async () => {
    let tree: any;
    await act(async () => {
      tree = ReactTestRenderer.create(
        <AuthContext.Provider value={mockAuthContextValue}>
          <SignupScreen navigation={mockNavigation} />
        </AuthContext.Provider>
      ).toJSON();
    });
    expect(tree).toMatchSnapshot();
  });

  it('displays all UI elements', async () => {
    let instance;
  
    await act(async () => {
      instance = create(
        <AuthContext.Provider value={mockAuthContextValue}>
          <SignupScreen navigation={mockNavigation} />
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
      (element: any) => element.props.children === 'Please enter your name, email and password to signup'
    );
    expect(descriptionElements.length).toBeGreaterThan(0);

    // Check for Signup subtitle
    const signupSubtitleElements = root.findAllByType(Text).filter(
      (element: any) => element.props.children === 'Signup'
    );
    expect(signupSubtitleElements.length).toBeGreaterThan(0);
  });

  it('shows name error when name is empty', async () => {
    let instance: ReactTestRenderer.ReactTestRenderer;
    await act(async () => {
      instance = ReactTestRenderer.create(
        <AuthContext.Provider value={mockAuthContextValue}>
          <SignupScreen navigation={mockNavigation} />
        </AuthContext.Provider>
      );
    });

    const root = instance!.root;
    const signupButton = root.findAllByProps({ text: 'Signup' })[0];
    
    // Trigger signup with empty name
    await act(async () => {
      signupButton.props.onPress();
    });

    // Check for error message
    const errorTexts = root.findAllByType(Text).filter(
      (element: any) => element.props.children === 'Missing name field.'
    );
    expect(errorTexts.length).toBeGreaterThan(0);
    expect(mockSignup).not.toHaveBeenCalled();
  });

  it('shows email error when email is empty', async () => {
    let instance: ReactTestRenderer.ReactTestRenderer;
    await act(async () => {
      instance = ReactTestRenderer.create(
        <AuthContext.Provider value={mockAuthContextValue}>
          <SignupScreen navigation={mockNavigation} />
        </AuthContext.Provider>
      );
    });

    const root = instance!.root;
    const textInputs = root.findAllByType(TextInput);
    
    // Set name but empty email
    await act(async () => {
      textInputs[0].props.onChangeText('John Doe');
    });
    
    const signupButton = root.findAllByProps({ text: 'Signup' })[0];
    await act(async () => {
      signupButton.props.onPress();
    });

    // Check for error message
    const errorTexts = root.findAllByType(Text).filter(
      (element: any) => element.props.children === 'Missing email field.'
    );
    expect(errorTexts.length).toBeGreaterThan(0);
    expect(mockSignup).not.toHaveBeenCalled();
  });

  it('shows email error when email format is invalid', async () => {
    let instance: ReactTestRenderer.ReactTestRenderer;
    await act(async () => {
      instance = ReactTestRenderer.create(
        <AuthContext.Provider value={mockAuthContextValue}>
          <SignupScreen navigation={mockNavigation} />
        </AuthContext.Provider>
      );
    });

    const root = instance!.root;
    const textInputs = root.findAllByType(TextInput);
    
    // Set name and invalid email
    await act(async () => {
      textInputs[0].props.onChangeText('John Doe');
      textInputs[1].props.onChangeText('invalid-email');
    });
    
    const signupButton = root.findAllByProps({ text: 'Signup' })[0];
    await act(async () => {
      signupButton.props.onPress();
    });

    // Check for error message
    const errorTexts = root.findAllByType(Text).filter(
      (element: any) => element.props.children === 'Invalid email format.'
    );
    expect(errorTexts.length).toBeGreaterThan(0);
    expect(mockSignup).not.toHaveBeenCalled();
  });

  it('shows password error when password is empty', async () => {
    let instance: ReactTestRenderer.ReactTestRenderer;
    await act(async () => {
      instance = ReactTestRenderer.create(
        <AuthContext.Provider value={mockAuthContextValue}>
          <SignupScreen navigation={mockNavigation} />
        </AuthContext.Provider>
      );
    });

    const root = instance!.root;
    const textInputs = root.findAllByType(TextInput);
    
    // Set name and email but empty password
    await act(async () => {
      textInputs[0].props.onChangeText('John Doe');
      textInputs[1].props.onChangeText('test@example.com');
    });
    
    const signupButton = root.findAllByProps({ text: 'Signup' })[0];
    await act(async () => {
      signupButton.props.onPress();
    });

    // Check for error message
    const errorTexts = root.findAllByType(Text).filter(
      (element: any) => element.props.children === 'Missing password field.'
    );
    expect(errorTexts.length).toBeGreaterThan(0);
    expect(mockSignup).not.toHaveBeenCalled();
  });

  it('shows password error when password is too short', async () => {
    let instance: ReactTestRenderer.ReactTestRenderer;
    await act(async () => {
      instance = ReactTestRenderer.create(
        <AuthContext.Provider value={mockAuthContextValue}>
          <SignupScreen navigation={mockNavigation} />
        </AuthContext.Provider>
      );
    });

    const root = instance!.root;
    const textInputs = root.findAllByType(TextInput);
    
    // Set name, email but short password
    await act(async () => {
      textInputs[0].props.onChangeText('John Doe');
      textInputs[1].props.onChangeText('test@example.com');
      textInputs[2].props.onChangeText('12345'); // Less than 6 characters
    });
    
    const signupButton = root.findAllByProps({ text: 'Signup' })[0];
    await act(async () => {
      signupButton.props.onPress();
    });

    // Check for error message
    const errorTexts = root.findAllByType(Text).filter(
      (element: any) => element.props.children === 'Password must be at least 6 characters.'
    );
    expect(errorTexts.length).toBeGreaterThan(0);
    expect(mockSignup).not.toHaveBeenCalled();
  });

  it('calls signup function with valid credentials', async () => {
    mockSignup.mockReturnValue(true);
    
    let instance: ReactTestRenderer.ReactTestRenderer;
    await act(async () => {
      instance = ReactTestRenderer.create(
        <AuthContext.Provider value={mockAuthContextValue}>
          <SignupScreen navigation={mockNavigation} />
        </AuthContext.Provider>
      );
    });

    const root = instance!.root;
    const textInputs = root.findAllByType(TextInput);
    
    // Set valid name, email and password
    await act(async () => {
      textInputs[0].props.onChangeText('John Doe');
      textInputs[1].props.onChangeText('test@example.com');
      textInputs[2].props.onChangeText('password123');
    });
    
    const signupButton = root.findAllByProps({ text: 'Signup' })[0];
    await act(async () => {
      signupButton.props.onPress();
    });

    expect(mockSignup).toHaveBeenCalledWith('John Doe', 'test@example.com', 'password123');
  });

  it('shows error message when signup fails', async () => {
    mockSignup.mockReturnValue(false);
    
    let instance: ReactTestRenderer.ReactTestRenderer;
    await act(async () => {
      instance = ReactTestRenderer.create(
        <AuthContext.Provider value={mockAuthContextValue}>
          <SignupScreen navigation={mockNavigation} />
        </AuthContext.Provider>
      );
    });

    const root = instance!.root;
    const textInputs = root.findAllByType(TextInput);
    
    // Set valid credentials
    await act(async () => {
      textInputs[0].props.onChangeText('John Doe');
      textInputs[1].props.onChangeText('test@example.com');
      textInputs[2].props.onChangeText('password123');
    });
    
    const signupButton = root.findAllByProps({ text: 'Signup' })[0];
    await act(async () => {
      signupButton.props.onPress();
    });

    expect(mockSignup).toHaveBeenCalled();
    
    // Check for error message
    const errorTexts = root.findAllByType(Text).filter(
      (element: any) => element.props.children === 'Signup failed. Try again.'
    );
    expect(errorTexts.length).toBeGreaterThan(0);
  });

  it('navigates to Login screen when "Go to Login" button is pressed', async () => {
    let instance: ReactTestRenderer.ReactTestRenderer;
    await act(async () => {
      instance = ReactTestRenderer.create(
        <AuthContext.Provider value={mockAuthContextValue}>
          <SignupScreen navigation={mockNavigation} />
        </AuthContext.Provider>
      );
    });

    const root = instance!.root;
    const loginButton = root.findAllByProps({ text: 'Go to Login' })[0];
    
    await act(async () => {
      loginButton.props.onPress();
    });

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Login');
  });

  it('clears errors when signup is attempted again', async () => {
    let instance: ReactTestRenderer.ReactTestRenderer;
    await act(async () => {
      instance = ReactTestRenderer.create(
        <AuthContext.Provider value={mockAuthContextValue}>
          <SignupScreen navigation={mockNavigation} />
        </AuthContext.Provider>
      );
    });

    const root = instance!.root;
    const signupButton = root.findAllByProps({ text: 'Signup' })[0];
    
    // First attempt with empty fields
    await act(async () => {
      signupButton.props.onPress();
    });
    
    // Set valid credentials
    const textInputs = root.findAllByType(TextInput);
    await act(async () => {
      textInputs[0].props.onChangeText('John Doe');
      textInputs[1].props.onChangeText('test@example.com');
      textInputs[2].props.onChangeText('password123');
    });
    
    // Second attempt
    await act(async () => {
      signupButton.props.onPress();
    });

    // Errors should be cleared and signup should be called
    expect(mockSignup).toHaveBeenCalled();
  });

  it('validates all fields together', async () => {
    let instance: ReactTestRenderer.ReactTestRenderer;
    await act(async () => {
      instance = ReactTestRenderer.create(
        <AuthContext.Provider value={mockAuthContextValue}>
          <SignupScreen navigation={mockNavigation} />
        </AuthContext.Provider>
      );
    });

    const root = instance!.root;
    const signupButton = root.findAllByProps({ text: 'Signup' })[0];
    
    // Attempt signup with all fields empty
    await act(async () => {
      signupButton.props.onPress();
    });

    // Should show name error (first validation)
    const nameErrorTexts = root.findAllByType(Text).filter(
      (element: any) => element.props.children === 'Missing name field.'
    );
    expect(nameErrorTexts.length).toBeGreaterThan(0);
    expect(mockSignup).not.toHaveBeenCalled();
  });
});
