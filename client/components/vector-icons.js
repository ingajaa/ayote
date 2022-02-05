// import React from 'react';
// import { StyleSheet } from 'react-native';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import Icon from 'react-native-vector-icons/FontAwesome';

// export const VectorIconsPack = {
//   name: 'vector',
//   icons: createIconsMap(),
// };

// function createIconsMap() {
//   return new Proxy({}, {
//     get(target, name) {
//       return IconProvider(name);
//     },
//   });
// }

// const IconProvider = (name) => ({
//   toReactElement: (props) => VectorIcon({ name, ...props }),
// });

// function VectorIcon({ name, style }) {
//   const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
//   return (
//     <Icon name={name} size={height} color={tintColor} style={iconStyle} />
//   );
// }