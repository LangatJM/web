import { contributionMargin, commission50 } from '../../src/lib/finance';

describe('finance helpers', () => {
  test('contributionMargin uses explicit margin when present', () => {
    const p: any = { customerPrice: 100, dealerPrice: 60, margin: 50 };
    expect(contributionMargin(p)).toBe(50);
  });

  test('contributionMargin computes from prices when margin missing', () => {
    const p: any = { customerPrice: 120, dealerPrice: 80 };
    expect(contributionMargin(p)).toBe(40);
  });

  test('commission50 returns 50% rounded', () => {
    const p: any = { customerPrice: 101, dealerPrice: 50 };
    // margin = 51 -> 50% = 25.5 -> rounded 26
    expect(commission50(p)).toBe(26);
  });
});
