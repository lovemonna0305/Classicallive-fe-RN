import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function FullScreen(props) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M2.571 11.571H0V18h6.429v-2.571H2.57V11.57zM0 6.43h2.571V2.57H6.43V0H0v6.429zm15.429 9H11.57V18H18v-6.429h-2.571v3.858zM11.57 0v2.571h3.858V6.43H18V0h-6.429z"
        fill="#fff"
      />
    </Svg>
  );
}

export default FullScreen;
