import { LightState } from './Light.state';

export const red: LightState = {
  color: 'red',
  delay: 5000,
  next: () => green,
};

export const green: LightState = {
  color: 'green',
  delay: 3000,
  next: () => yellow,
};

export const yellow: LightState = {
  color: 'yellow',
  delay: 2000,
  next: () => red,
};
