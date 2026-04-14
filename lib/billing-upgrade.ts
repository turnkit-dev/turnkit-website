export const BILLING_CCU_TIERS = [20, 40, 80, 160, 320, 640] as const;

export type BillingCcuTier = (typeof BILLING_CCU_TIERS)[number];

export type UpgradeModuleKey = 'TURN_RELAY' | 'LEADERBOARDS';

export interface UpgradeModulePricing {
  key: UpgradeModuleKey;
  label: string;
  description: string;
  prices: number[];
}

export const UPGRADE_MODULE_PRICING: UpgradeModulePricing[] = [
  {
    key: 'TURN_RELAY',
    label: 'Relay',
    description: 'Turn enforcement, hidden lists, and signed match results.',
    prices: [0, 4.99, 9.99, 19.99, 39.99, 79.99],
  },
  {
    key: 'LEADERBOARDS',
    label: 'Leaderboards',
    description: 'Global and seasonal leaderboards.',
    prices: [0, 1.99, 3.99, 7.99, 15.99, 31.99],
  },
];

export const BILLING_MODULE_KEYS = UPGRADE_MODULE_PRICING.map((module) => module.key) as UpgradeModuleKey[];

export function isUpgradeModuleKey(value: string): value is UpgradeModuleKey {
  return BILLING_MODULE_KEYS.includes(value as UpgradeModuleKey);
}

export function formatPrice(value: number) {
  if (value === 0) {
    return '$0';
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function getCcuTierIndex(ccu: number) {
  const exactIndex = BILLING_CCU_TIERS.indexOf(ccu as BillingCcuTier);
  if (exactIndex >= 0) {
    return exactIndex;
  }

  const firstHigherIndex = BILLING_CCU_TIERS.findIndex((tier) => tier > ccu);
  if (firstHigherIndex >= 0) {
    return firstHigherIndex;
  }

  return BILLING_CCU_TIERS.length - 1;
}

export function getNextCcuTier(currentCcu: number) {
  const nextTier = BILLING_CCU_TIERS.find((tier) => tier > currentCcu);
  return nextTier ?? null;
}

export function getCurrentSubscriptionCcu(currentCcu: number) {
  const exactTier = BILLING_CCU_TIERS.find((tier) => tier === currentCcu);
  return exactTier ?? BILLING_CCU_TIERS[getCcuTierIndex(currentCcu)];
}

export function normalizeSelectableModules(modules: string[]) {
  return modules.filter((module): module is UpgradeModuleKey => isUpgradeModuleKey(module));
}

export function getModulePricing(module: UpgradeModuleKey) {
  return UPGRADE_MODULE_PRICING.find((item) => item.key === module) ?? null;
}

export function calculateMonthlyTotal(ccu: number, modules: UpgradeModuleKey[]) {
  const tierIndex = getCcuTierIndex(ccu);
  const subtotal = modules.reduce((sum, module) => {
    const pricing = getModulePricing(module);
    return sum + (pricing?.prices[tierIndex] ?? 0);
  }, 0);
  if (modules.length <= 1 || subtotal <= 0) {
    return subtotal;
  }
  return roundUpToNinetyNine(subtotal);
}

export function roundUpToNinetyNine(value: number) {
  if (value <= 0) {
    return 0;
  }
  return Math.floor(value) + 0.99;
}

export function getSelectedTierPrice(module: UpgradeModuleKey, ccu: number) {
  const pricing = getModulePricing(module);
  if (!pricing) {
    return 0;
  }
  return pricing.prices[getCcuTierIndex(ccu)] ?? 0;
}

export function getModuleLabel(module: UpgradeModuleKey) {
  return getModulePricing(module)?.label ?? module;
}

export function getModuleDescription(module: UpgradeModuleKey) {
  return getModulePricing(module)?.description ?? '';
}
