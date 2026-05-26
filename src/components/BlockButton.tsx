import React from 'react';
import {Button} from 'react-native';

type Props = {
  duration?: number;
  title?: string;
};

export const BlockButton: React.FC<Props> = ({
  duration = 2000,
  title = 'Travar JS Thread',
}) => {
  const blockJS = () => {
    const start = Date.now();
    const iterations = duration * 250_000;
    let acc = 0;
    for (let i = 0; i < iterations; i++) {
      acc += i;
    }
    console.log(`Bloqueou por ${Date.now() - start}ms (acc=${acc})`);
  };

  return <Button title={title} onPress={blockJS} />;
};
