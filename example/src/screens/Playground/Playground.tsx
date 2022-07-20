import React, { memo, useMemo } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';

import { HoldItem } from 'react-native-hold-menu';

import styles from './styles';
import { useAppContext } from '../../hooks/useAppContext';
import StyleGuide from '../../utilities/styleGuide';

interface PlaygroundProps {}

const PreviewComp = () => (
  <Pressable
    onPress={() => {
      Alert.alert('sss');
    }}
    style={{
      width: '100%',
      height: '100%',
      minWidth: 200,
      minHeight: 200,
      backgroundColor: 'green',
      borderRadius: 16,
    }}
  >
    <Text>Presss</Text>
  </Pressable>
);

const Playground = ({}: PlaygroundProps) => {
  const { theme } = useAppContext();

  const items = [
    {
      isTitle: true,
      text: 'Actions',
    },
    {
      text: 'Home',
      icon: 'home',
      onPress: () => {
        console.log('[ACTION]: Home');
      },
    },
    {
      text: 'Edit',
      icon: 'edit',
      onPress: () => {
        console.log('[ACTION]: Edit');
      },
    },
    {
      text: 'Download',
      onPress: () => {
        console.log('[ACTION]: Download');
      },
      icon: 'download',
    },
    {
      text: 'Delete',
      onPress: () => {
        console.log('[ACTION]: Delete');
      },
      icon: 'trash',
      withSeparator: true,
      isDestructive: true,
    },
    {
      text: 'Share',
      onPress: () => {
        console.log('[ACTION]: Share');
      },
      icon: 'share',
    },
    {
      text: 'More',
      onPress: () => {
        console.log('[ACTION]: More');
      },
      icon: 'more-horizontal',
    },
  ];

  const themeStyles = useMemo(() => {
    return {
      containerStyles: [
        styles.container,
        { backgroundColor: StyleGuide.palette[theme].backgroundColor },
      ],
      item: [
        styles.item,
        { backgroundColor: StyleGuide.palette[theme].primary },
      ],
      dot: [
        styles.dot,
        { backgroundColor: StyleGuide.palette[theme].primaryDark },
      ],
      footer: [
        styles.footer,
        { borderColor: StyleGuide.palette[theme].secondary },
      ],
    };
  }, [theme]);

  return (
    <View style={themeStyles.containerStyles}>
      <View style={[styles.column, styles.content]}>
        <View style={[styles.row]}>
          <HoldItem items={items} menuAnchorPosition="bottom-left">
            <View style={themeStyles.item}>
              <View style={[themeStyles.dot, styles.bottomLeft]} />
            </View>
          </HoldItem>
          <HoldItem items={items} previewComponent={PreviewComp}>
            <View style={themeStyles.item}>
              <View style={[themeStyles.dot, styles.topCenter]} />
            </View>
          </HoldItem>
          <HoldItem items={items}>
            <View style={themeStyles.item}>
              <View style={[themeStyles.dot, styles.topRight]} />
            </View>
          </HoldItem>
        </View>
        <View style={[styles.row]}>
          <HoldItem items={items}>
            <View style={themeStyles.item}>
              <View style={[themeStyles.dot, styles.topLeft]} />
            </View>
          </HoldItem>
          <HoldItem items={items}>
            <View style={themeStyles.item}>
              <View style={[themeStyles.dot, styles.topCenter]} />
            </View>
          </HoldItem>
          <HoldItem items={items}>
            <View style={themeStyles.item}>
              <View style={[themeStyles.dot, styles.topRight]} />
            </View>
          </HoldItem>
        </View>
      </View>
      <View style={[themeStyles.footer, styles.row]}>
        <HoldItem
          menuAnchorPosition="bottom-left"
          items={items}
          previewComponent={PreviewComp}
        >
          <View style={themeStyles.item}>
            <View style={[themeStyles.dot, styles.bottomLeft]} />
          </View>
        </HoldItem>
        <HoldItem menuAnchorPosition="bottom-center" items={items}>
          <View style={themeStyles.item}>
            <View style={[themeStyles.dot, styles.bottomCenter]} />
          </View>
        </HoldItem>
        <HoldItem menuAnchorPosition="bottom-right" items={items}>
          <View style={themeStyles.item}>
            <View style={[themeStyles.dot, styles.bottomRight]} />
          </View>
        </HoldItem>
      </View>
    </View>
  );
};

export default memo(Playground);
