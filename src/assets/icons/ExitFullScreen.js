import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function ExitFullScreen(props) {
  return (
    <Svg
      width={22}
      height={22}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M7.782 8.908H2a1.125 1.125 0 010-2.25h4.657V2a1.125 1.125 0 012.25 0v5.782a1.125 1.125 0 01-1.125 1.126zm0 12.217A1.125 1.125 0 016.657 20v-4.658H2a1.125 1.125 0 110-2.25h5.782a1.125 1.125 0 011.126 1.125V20a1.125 1.125 0 01-1.125 1.125zm6.435 0A1.125 1.125 0 0113.092 20v-5.783a1.125 1.125 0 011.125-1.125H20a1.125 1.125 0 110 2.25h-4.658V20a1.125 1.125 0 01-1.125 1.125zM20 8.908h-5.783a1.125 1.125 0 01-1.125-1.125V2a1.125 1.125 0 112.25 0v4.657H20a1.125 1.125 0 010 2.25z"
        fill="#fff"
      />
    </Svg>
  );
}

export default ExitFullScreen;
