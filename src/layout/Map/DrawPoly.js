import * as React from 'react';
import { useState, useCallback } from 'react';
import { useDidUpdate } from '@mantine/hooks';
import DrawControl from './DrawControl';


export default ({ setDrawn }) => {
    const [features, setFeatures] = useState({});

    useDidUpdate(() => {
        setDrawn(features)
    }, [features])

    const onUpdate = useCallback(e => {

        setFeatures(currFeatures => {
            const newFeatures = { ...currFeatures };
            for (const f of e.features) {
                newFeatures[f.id] = f;
            }
            return newFeatures;
        });
    }, []);

    const onDelete = useCallback(e => {
        setFeatures(currFeatures => {
            const newFeatures = { ...currFeatures };
            for (const f of e.features) {
                delete newFeatures[f.id];
            }
            return newFeatures;
        });
    }, []);

    return (
        <DrawControl
            onCreate={onUpdate}
            onUpdate={onUpdate}
            onDelete={onDelete}
        />
    );
}