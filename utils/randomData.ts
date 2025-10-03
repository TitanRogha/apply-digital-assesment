// Generate random number between 1 and 20
export function getRandomQuantity(min: number = 1, max: number = 20): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}