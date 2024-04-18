import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Eye(props) {
  return (
    <Svg
      width={14}
      height={14}
      viewBox="0 0 12 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M.662 4.723a5.628 5.628 0 0110.676-.003c.06.181.06.376 0 .557A5.627 5.627 0 01.662 5.28a.881.881 0 010-.557zM8.625 5a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
        fill="#fff"
      />
    </Svg>
  );
}

export default Eye;
