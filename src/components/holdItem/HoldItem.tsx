import React, { memo } from 'react';
import { useDerivedValue } from 'react-native-reanimated';

// Components
import HoldItemChild from './HoldItemChild';

// Types
import type { HoldItemProps } from './types';

const HoldItemComponent = ({ ...props }: HoldItemProps) => {
  const isActive = useDerivedValue(() => {
    return props.active.value == props.id;
  }, [props.active]);

  return (
    <HoldItemChild {...props} isActive={isActive}>
      {props.children}
    </HoldItemChild>
  );
};

const HoldItem = memo(HoldItemComponent, (prevProps, nextProps) => {
  if (prevProps.active.value === nextProps.active.value) return true;
  else return false;
});

export default HoldItem;
