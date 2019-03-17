import { printableCustomerPreferences } from '../src/satisfyCustomers';

describe('', () => {
it('case0', () => { expect(printableCustomerPreferences(
`5
1 M 3 G 5 G
2 G 3 M 4 G
5 M`))
.toMatch("G G G G M");
});

it('case1', () => { expect(printableCustomerPreferences(
`1
1 M
1 G`))
.toMatch("No solution exists");
});
  
it('case2', () => { expect(printableCustomerPreferences(
`5
2 M
5 G
1 G
5 G 1 G 4 M
3 G
5 G
3 G 5 G 1 G
3 G
2 M
5 G 1 G
2 M
5 G
4 M
5 G 4 M`))
.toMatch("G M G M G");
});

it('case3', () => { expect(printableCustomerPreferences(
`2
1 G 2 M
1 M`)).toMatch("M M");
});

it('case4', () => { expect(printableCustomerPreferences(
`a`)).toMatch("No solution exists");
});

it('case5', () => { expect(printableCustomerPreferences(
  `2
  1 G 2 G
  1 G`)).toMatch("G G");
});

it('case6', () => { expect(printableCustomerPreferences(
  `3
  1 G 2 G
  1 G`)).toMatch("G G G");
});

it('case7', () => { expect(printableCustomerPreferences(
  `3
  1 M
  2 G 3 M
  1 G 2 M`)).toMatch("M M M");
});

});