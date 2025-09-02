export const setTime = (word: string, temp : string ) : {backgroundColor : string, climate: string} => {

    let backgroundColor = '#00d5ff' //valor por defecto
    let climate : string = ''
    

    // Noche
    if (temp === 'night'){
        if (word.includes('claro')) return {backgroundColor : '#011a49', climate : 'nocheDespejada'} 
        
        if (word.includes('nuboso') || (word.includes('nubes'))) return {backgroundColor : '#2b2d33ff', climate : 'nocheNublada'}
        
        if (word.includes('lluvia')) return {backgroundColor: '#4c4c4eff', climate: 'lluvioso'}

        if (word.includes('niebla') || word.includes('neblina')) return {backgroundColor : '#2e2e40ff', climate: 'niebla'}

        if (word.includes('nieve')) return {backgroundColor: '#4c4c4eff', climate: 'nieve'}

        if (word.includes('tormenta')) return {backgroundColor : '#363639ff', climate: 'tormenta'}
    }

    // Dia
    if (temp === 'day'){
        if (word.includes('claro')) return {backgroundColor:'#00d5ff', climate: 'diaDespejado'}
        
        if (word.includes('nuboso') || word.includes('nubes')) return {backgroundColor: '#abbabcff', climate: 'diaNublado'}

        if (word.includes('lluvia')) return {backgroundColor: '#737378ff', climate: 'lluvioso'}

        if (word.includes('niebla') || word.includes('neblina')) return {backgroundColor: '#71c0d0ff', climate: 'niebla'}

        if (word.includes('nieve')) return {backgroundColor: '#ceced3ff', climate: 'nieve'}

        if (word.includes('tormenta')) return {backgroundColor : '#5f5f5fff', climate: 'tormenta'}
    }
    return {backgroundColor, climate} 
}