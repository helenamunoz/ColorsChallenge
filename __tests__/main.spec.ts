import { getColorPreferences } from '../src/main';
import { Customer } from '../src/Customer';
import { ColorFinish } from '../src/ColorPreference';

describe('', () => {
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