export const CHANGE_COLOR = 'CHANGE_COLOR';

export const changeColor = colors => {
    return {
        type: CHANGE_COLOR,
        colors: colors
    }
}