import { Dimensions, Image, StyleSheet } from 'react-native';
import Animated, {
    useAnimatedStyle,
    interpolate,
    Extrapolation
} from "react-native-reanimated";

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width / 3.6;

const ElementosCarusel = ({ index, item, contentOffset }) => {

    const rStyle = useAnimatedStyle(() => {

        //Posiciones del scroll para realizar algo
        const inputRange = [
            (index - 1) * ITEM_WIDTH,
            index * ITEM_WIDTH,
            (index + 1) * ITEM_WIDTH,
        ];
        
        //Curvatura de la lista
        const translateY = interpolate(
            contentOffset.value,
            inputRange,
            [80, 15, 80],
            Extrapolation.CLAMP
        );
        
        //Tamaño del objeto
        const scale = interpolate(
            contentOffset.value,
            inputRange,
            [0.7, 1.4, 0.7],
            Extrapolation.CLAMP
        );


        return {
            transform: [
                { translateX:  ITEM_WIDTH },
                { translateY: -translateY },
                { scale }
            ]
        };
    });

    return (
        <Animated.View style={[styles.itemCarusel, rStyle]}>
            <Image
                source={item}
                style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    borderRadius: 100,
                }}
                resizeMode="contain"
            />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    itemCarusel: {
        width: ITEM_WIDTH,
        height: ITEM_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
});

export default ElementosCarusel;
