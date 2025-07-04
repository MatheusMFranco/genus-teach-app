import { LightType } from './Light.type';

export interface LightState {
    color: LightType;
    delay: number;
    next: () => LightState;
}
