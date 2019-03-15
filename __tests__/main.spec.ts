import { processInput,getColorPreferences } from '../src/main';
import { Customer } from '../src/Customer';
import { ColorFinish } from '../src/ColorPreference';

describe('', () => {
it('case0', () => { expect(processInput(
`5
1 M 3 G 5 G
2 G 3 M 4 G
5 M`))
.toMatch("G G G G M");
});

it('case1', () => { expect(processInput(
`1
1 M
1 G`))
.toMatch("No solution exists");
});
  
it('case2', () => { expect(processInput(
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

it('case3', () => { expect(processInput(
`2
1 G 2 M
1 M`)).toMatch("M M");
});

it('case4', () => { expect(processInput(
`a`)).toMatch("No solution exists");
});

it('case5', () => { expect(processInput(
  `2
  1 G 2 G
  1 G`)).toMatch("G G");
});

it('case6', () => { expect(processInput(
  `3
  1 G 2 G
  1 G`)).toMatch("G G G");
});
  
            
  it('case1', () => {
    const preferences = getColorPreferences(
      [
        new Customer({preferences: [{id: 1, preference: ColorFinish.Mate}, {id: 3, preference: ColorFinish.Gloss}, {id: 5, preference: ColorFinish.Gloss}]}), 
        new Customer({preferences: [{id: 2, preference: ColorFinish.Gloss}, {id: 3, preference: ColorFinish.Mate}, {id: 4, preference: ColorFinish.Gloss}]}), 
        new Customer({preferences: [{id: 5, preference: ColorFinish.Mate}]}), 
      ],
      5);
  
    expect(preferences).toMatchObject(
      [{id: 1, preference: ColorFinish.Gloss}, {id: 2, preference: ColorFinish.Gloss}, {id: 3, preference: ColorFinish.Gloss}, {id: 4, preference: ColorFinish.Gloss}, {id: 5, preference: ColorFinish.Mate}]);  
    })
});