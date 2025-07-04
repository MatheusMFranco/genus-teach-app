import React, { useEffect, useState } from 'react';
import { LightProps } from './Light.props';
import './Light.css';

const Light = ({color,  isOn = false, isManual = false}: LightProps) => {

    const [active, setActive] = useState(isOn);

    const toggle = () => isManual && setActive(prev => !prev);

    useEffect(() => {
        if(!isManual) {
            setActive(isOn);
        }
    }, [isOn, isManual]);

    return (
                <section
                    onClick={toggle}
                    className={`Light ${(isManual ? active : isOn) ? color : 'off'}`}
                    data-testid="light"> 
                </section>
            );
}

export default Light;
