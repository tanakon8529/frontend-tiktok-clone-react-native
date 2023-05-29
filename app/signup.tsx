import { JSXElementConstructor, ReactElement, ReactNode, useState } from "react";
import { useWindowDimensions, PressableAndroidRippleConfig, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { TabView, TabBar, SceneMap, NavigationState, Route, SceneRendererProps, TabBarIndicatorProps, TabBarItemProps } from 'react-native-tab-view';
import { StyleSheet } from "react-native";
import { Scene, Event } from "react-native-tab-view/lib/typescript/src/types";

import { EmailRoute } from "../components/TabViewSignup/SignupEmail";
import { PhoneRoute } from "../components/TabViewSignup/SignupPhone";
import React from "react";

export default function TabViewExample() {
    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Phone' },
        { key: 'second', title: 'Email' },
    ]);

    const renderScene = SceneMap({
        first: PhoneRoute,
        second: EmailRoute,
    });

    const renderTabBar = (props: JSX.IntrinsicAttributes & SceneRendererProps & { navigationState: NavigationState<Route>; 
                            scrollEnabled?: boolean | undefined; 
                            bounces?: boolean | undefined; 
                            activeColor?: string | undefined; 
                            inactiveColor?: string | undefined; 
                            pressColor?: string | undefined; 
                            pressOpacity?: number | undefined; 
                            getLabelText?: ((scene: Scene<Route>) => string | undefined) | undefined; 
                            getAccessible?: ((scene: Scene<Route>) => boolean | undefined) | undefined; 
                            getAccessibilityLabel?: ((scene: Scene<Route>) => string | undefined) | undefined; 
                            getTestID?: ((scene: Scene<Route>) => string | undefined) | undefined; 
                            renderLabel?: ((scene: Scene<Route> & { focused: boolean; color: string; }) => ReactNode) | undefined; 
                            renderIcon?: ((scene: Scene<Route> & { focused: boolean; color: string; }) => ReactNode) | undefined; 
                            renderBadge?: ((scene: Scene<Route>) => ReactNode) | undefined; 
                            renderIndicator?: ((props: TabBarIndicatorProps<Route>) => ReactNode) | undefined; 
                            renderTabBarItem?: ((props: TabBarItemProps<Route> & { key: string; }) => ReactElement<any, string | JSXElementConstructor<any>>) | undefined; 
                            onTabPress?: ((scene: Scene<Route> & Event) => void) | undefined; 
                            onTabLongPress?: ((scene: Scene<Route>) => void) | undefined; 
                            tabStyle?: StyleProp<ViewStyle>; 
                            indicatorStyle?: StyleProp<ViewStyle>; 
                            indicatorContainerStyle?: StyleProp<ViewStyle>; 
                            labelStyle?: StyleProp<TextStyle>; 
                            contentContainerStyle?: StyleProp<ViewStyle>; 
                            style?: StyleProp<ViewStyle>; 
                            gap?: number | undefined; 
                            testID?: string | undefined; 
                            android_ripple?: PressableAndroidRippleConfig | undefined; }) => (
        <TabBar
            {...props}
            activeColor={'black'}
            inactiveColor={'gray'}
            pressColor={'black'}
            style={styles.tabBar}
        />
    );

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
        />
    );
};

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#DCDCDC',
        color: 'black',
    },
});