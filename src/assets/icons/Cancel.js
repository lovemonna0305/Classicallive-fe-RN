import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Cancel(props) {
  return (
    <Svg
      width={14}
      height={14}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M12 1.209L10.791 0 6 4.791 1.209 0 0 1.209 4.791 6 0 10.791 1.209 12 6 7.209 10.791 12 12 10.791 7.209 6 12 1.209z"
        fill="#fff"
      />
    </Svg>
  );
}

export default Cancel;
