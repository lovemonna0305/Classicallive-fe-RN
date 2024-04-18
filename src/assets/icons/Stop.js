import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

function Stop(props) {
  return (
    <Svg
      width={60}
      height={60}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_276_225)">
        <Path fill="#fff" d="M13.125 13.75H45.625V45.625H13.125z" />
        <Path
          d="M30 0C13.432 0 0 13.432 0 30c0 16.568 13.432 30 30 30 16.568 0 30-13.432 30-30C60 13.432 46.568 0 30 0zm11.25 37.5a3.75 3.75 0 01-3.75 3.75h-15a3.75 3.75 0 01-3.75-3.75v-15a3.75 3.75 0 013.75-3.75h15a3.75 3.75 0 013.75 3.75v15z"
          fill="#FF5D5D"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_276_225">
          <Path fill="#fff" d="M0 0H60V60H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default Stop;
