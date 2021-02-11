import React, { useMemo } from 'react';

import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import StyleGuide from '../StyleGuide';
import {
  calculateMenuHeight,
  menuAnimationAnchor,
} from '../../utils/calculations';
import { BlurView } from '@react-native-community/blur';

import MenuItem from './MenuItem';
import {
  MENU_WIDTH,
  SPRING_CONFIGURATION_MENU,
  HOLD_ITEM_TRANSFORM_DURATION,
  IS_IOS,
} from '../../constants';

import styles from './styles';
import { MenuItemProps, MenuProps } from './types';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const MenuComponent = ({
  id,
  items,
  isActive,
  itemHeight,
  itemWidth,
  anchorPosition,
  theme = 'light',
}: MenuProps) => {
  const wrapperStyles = useAnimatedStyle(() => {
    return {
      top: (itemHeight.value || 0) + StyleGuide.spacing,
      width: itemWidth.value,
    };
  });

  const menuHeight = useMemo(() => calculateMenuHeight(items.length), [
    anchorPosition,
  ]);

  const messageStyles = useAnimatedStyle(() => {
    const translate = menuAnimationAnchor(
      anchorPosition.value,
      itemWidth.value
    );
    const position = anchorPosition.value;

    const leftOrRight = position
      ? position.includes('right')
        ? { right: 0 }
        : position.includes('left')
        ? { left: 0 }
        : { left: -itemWidth.value - MENU_WIDTH / 2 + itemWidth.value / 2 }
      : {};

    const menuScaleAnimation = () =>
      isActive.value
        ? withSpring(1, SPRING_CONFIGURATION_MENU)
        : withTiming(0, {
            duration: HOLD_ITEM_TRANSFORM_DURATION,
          });

    const opacityAnimation = () =>
      withTiming(isActive.value ? 1 : 0, {
        duration: HOLD_ITEM_TRANSFORM_DURATION,
      });

    return {
      ...leftOrRight,
      height: menuHeight,
      backgroundColor: 'rgba(255,255,255,0.3)',
      opacity: opacityAnimation(),
      transform: [
        { translateX: translate.begginingTransformations.translateX },
        { translateY: translate.begginingTransformations.translateY },
        {
          scale: menuScaleAnimation(),
        },
        { translateX: translate.endingTransformations.translateX },
        { translateY: translate.endingTransformations.translateY },
      ],
    };
  });

  const itemList = () => (
    <>
      {items && items.length > 0 ? (
        items.map((item: MenuItemProps, index: number) => {
          return (
            <MenuItem
              key={index}
              item={item}
              isLast={items.length === index + 1}
            />
          );
        })
      ) : (
        <MenuItem
          item={{ title: 'Empty List', icon: null, onPress: () => {} }}
        />
      )}
    </>
  );

  return (
    <Animated.View style={[styles.menuWrapper, wrapperStyles]}>
      {!IS_IOS ? (
        <Animated.View style={[styles.menuContainer, messageStyles]}>
          {itemList}
        </Animated.View>
      ) : (
        <AnimatedBlurView
          blurType="light"
          blurAmount={20}
          style={[styles.menuContainer, messageStyles]}
        >
          {itemList}
        </AnimatedBlurView>
      )}
    </Animated.View>
  );
};

const Menu = React.memo(MenuComponent, (prevProps, nextProps) => {
  if (prevProps.isActive === nextProps.isActive) return true;
  else return false;
});
export default Menu;
