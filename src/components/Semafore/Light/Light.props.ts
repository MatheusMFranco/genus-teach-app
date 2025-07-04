import { LightType } from './Light.type';

export interface LightProps {
    isOn?: boolean;
    isManual?: boolean;
    color: LightType;
}
