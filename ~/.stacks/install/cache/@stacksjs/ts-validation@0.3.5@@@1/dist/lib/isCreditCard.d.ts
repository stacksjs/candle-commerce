declare const cards: Record<string, RegExp>;
declare const tmpCardsArray: RegExp[];

export default function isCreditCard(card: string, options: CreditCardOptions = {}): boolean {
  assertString(card)
  const { provider } = options
  const sanitized = card.replace(/[- ]+/g, '')
  if (provider && provider.toLowerCase() in cards) {
    if (!(cards[provider.toLowerCase()].test(sanitized))) {
      return false
    }
  }
  else if (provider && !(provider.toLowerCase() in cards)) {
    throw new Error(`${provider} is not a valid credit card provider.`)
  }
  else if (!allCards.some(cardProvider => cardProvider.test(sanitized))) {
    return false
  }
  return isLuhnValid(card)
};