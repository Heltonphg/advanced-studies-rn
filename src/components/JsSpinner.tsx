import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';

type Props = {
  size?: number;
  color?: string;
};

export const JsSpinner: React.FC<Props> = ({size = 32, color = '#3366ff'}) => {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setAngle(a => (a + 30) % 360);
    }, 50);
    return () => clearInterval(id);
  }, []);

  return (
    <View
      style={[
        styles.outer,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: size / 10,
          borderColor: '#eee',
          borderTopColor: color,
          transform: [{rotate: `${angle}deg`}],
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  outer: {},
});
