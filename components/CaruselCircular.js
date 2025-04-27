import React from "react";
import { View, Text, StyleSheet, Dimensions, FlatList, Image} from 'react-native';
import Animated, { useSharedValue} from "react-native-reanimated";
import ElementosCarusel from "./ElementosCarusel";

const { width, height } = Dimensions.get('window');

const CaruselCircular = ({ datos }) => {
    const contentOffset = useSharedValue(0);
    
    return (
        <FlatList
            style={styles.containerItem}
            horizontal
            data={datos}
            contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingRight: 1.5 * (width / 4) + (width / 4) +1.5,
            }}
            onScroll={(event) => {
                contentOffset.value = event.nativeEvent.contentOffset.x
            }}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index}) => (
                <ElementosCarusel
                    index={index}
                    item={item}
                    contentOffset={contentOffset}
                />
            )}
        >
        </FlatList>
    )
}

const styles = StyleSheet.create({
    containerItem: {
        top: 0,
        position: 'relative',
        paddingTop: 130,
    }
});

export default CaruselCircular