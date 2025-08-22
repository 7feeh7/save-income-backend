export const parseQueryParamToNumber = (value: any): number => {
    const parsedValue = Number(value)
    if (isNaN(parsedValue) || parsedValue < 0) {
        return 0
    }
    return parsedValue
}
