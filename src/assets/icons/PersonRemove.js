import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function PersonRemove(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      height={24}
      viewBox="0 96 960 960"
      width={24}
      {...props}>
      <Path d="M680 536q-17 0-28.5-11.5T640 496q0-17 11.5-28.5T680 456h160q17 0 28.5 11.5T880 496q0 17-11.5 28.5T840 536H680zm-320 40q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47zM80 896q-17 0-28.5-11.5T40 856v-72q0-34 17.5-62.5T104 678q62-31 126-46.5T360 616q66 0 130 15.5T616 678q29 15 46.5 43.5T680 784v72q0 17-11.5 28.5T640 896H80z" />
    </Svg>
  );
}

export default PersonRemove;
