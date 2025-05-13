import { Form } from '../components/componentesLogin/Form'
import { StyleSheet, View, Image, Text } from 'react-native'

const Login = () => {
    return (
        <>
            <View style={styles.container}>
                <View>
                    <Image source={require('../assets/Personas.png')} style={{ height: 200, width: 200, zIndex: 0 }} />
                </View>
                <View style={styles.contTitle}>
                    <Text style={[styles.textTitle, styles.safe]}>SafeB</Text><Text style={[styles.textTitle, styles.bond]}>ond</Text>
                </View>
                <View style={styles.containerLogin}>

                    <Form></Form>
                    <View style={styles.contPlant}>
                        <Image
                            source={require('../assets/plantLog.png')}
                            style={styles.plantImage}
                            pointerEvents="none" // 👈 esto hace que no bloquee clics
                        />
                    </View>
                </View>

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    contTitle: {
        display: 'flex',
        flexDirection: 'row'

    },
    container: {
        flex: 1,
        backgroundColor: '#BED9FF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerLogin: {
        backgroundColor: '#FBE7A7',
        width: '80%',
        marginTop: '2%',
        height: '55%',
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 7,
    },
    textTitle: {
        fontSize: 50,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
    },
    safe: {
        color: '#02167D'
    },
    bond: {
        color: '#6dd863'
    },
    contPlant: {
        position:'absolute',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
        bottom: -25,
        zIndex: -1,
    },
    plantImage: {
        height: 250,
        width: 200,
        zIndex: 2,
        position: 'absolute',
    }

})

export default Login;