import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Play(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" height={8} width={8} {...props}>
      <Path d="M9.525 18.025q-.5.325-1.013.037Q8 17.775 8 17.175V6.825q0-.6.512-.888.513-.287 1.013.038l8.15 5.175q.45.3.45.85t-.45.85z" />
    </Svg>
  );
}

export default Play;
