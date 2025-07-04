import React, { useEffect, useState } from 'react';
import Light from '../Light/Light';
import Colors from '../Colors';

import './TrafficLight.css';
import { LightState } from '../Light/Light.state';
import { red } from '../Light/LightsChain';

const TrafficLight = () => {

    const [active, setActive] = useState<LightState>(red);

    const colors = Colors;

    useEffect(() => {
        const timeout = setTimeout(() => setActive(active.next()), active.delay);
        return () => clearTimeout(timeout);
    }, [active]);

    return (
        <div className="TrafficLight" data-testid="traffic-light">
            {colors.map((color, i) => <Light key={i} color={color} isOn={color === active.color} />)}
        </div>
    );
}

export default TrafficLight;
