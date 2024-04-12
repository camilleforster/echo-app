import React from 'react';
import { render } from '@testing-library/react-native';
import Splash from '../screens/SplashPage';

describe('Splash', () => {
    it('should render the splash screen with an app logo and loading text', () => {
      const { getByTestId } = render(<Splash/>);
  
      // Check if the splash screen is rendered
      expect(getByTestId('splashBackground')).toBeTruthy();
  
      // Check if the app logo is displayed
      expect(getByTestId('echoLogo')).toBeTruthy();
    })
});