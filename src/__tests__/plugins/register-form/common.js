import {getNextStep} from '../../../server/plugins/register-form/steps/common';


describe('Get next step', () => {

  it('should give next step unconditionally if no checkApplies function', () => {
    const nextSteps = [
      {key: 'a'},
      {key: 'b'}
    ];
    expect(getNextStep(nextSteps, {})).toEqual('a');
  });

  it('should call checkApplies if defined', () => {
    const mockCheckApplies = jest.fn();
    mockCheckApplies.mockReturnValueOnce(false);

    const nextSteps = [
      {key: 'a', checkApplies: mockCheckApplies},
      {key: 'b'}
    ];
    const cookieData = {};
    getNextStep(nextSteps, cookieData);
    // The function was called exactly once
    expect(mockCheckApplies.mock.calls.length).toBe(1);
    // The first arg of the first call to the function was '{}'
    expect(mockCheckApplies.mock.calls[0][0]).toBe(cookieData);
  });

  it('should call checkApplies and return a if it passes', () => {
    const mockCheckApplies = jest.fn();
    mockCheckApplies.mockReturnValueOnce(true);

    const nextSteps = [
      {key: 'a', checkApplies: mockCheckApplies},
      {key: 'b'}
    ];
    expect(getNextStep(nextSteps, {})).toEqual('a');
  });

  it('should call checkApplies and return b if it fails', () => {
    const mockCheckApplies = jest.fn();
    mockCheckApplies.mockReturnValueOnce(false);

    const nextSteps = [
      {key: 'a', checkApplies: mockCheckApplies},
      {key: 'b'}
    ];
    expect(getNextStep(nextSteps, {})).toEqual('b');
  });
});
