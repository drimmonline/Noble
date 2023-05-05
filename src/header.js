import React from 'react';
import ComponentB from './ComponentB';

function HeaderNobel() {
    const a = 50;

    return (
        <div>
            <ComponentB valueOfA={a} />
        </div>
    );
}

export default HeaderNobel;

