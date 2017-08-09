import {getNextStep, getLatestUncompletedStep, getlastCompletedStep, checkStepCompletedBefore, getNextSlug} from '../../../server/plugins/register-form/steps/common';

import steps from '../../../server/plugins/register-form/steps/index';


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

  it('should call getLatestUncompletedStep and return right step', () => {
    const cookieData = {
      'nhsNumber': {
        'nhs-number-known': false
      },
    };
    expect(getLatestUncompletedStep(cookieData).key).toEqual('gender');
  });

  it('should call getlastCompletedStep and return right step', () => {
    const cookieData = {
      'nhsNumber': {
        'nhs-number-known': false
      },
      'gender': {
        'gender': 'Male'
      }
    };

    expect(getlastCompletedStep(cookieData).key).toEqual('gender');
  });

  it('should call checkStepCompletedBefore and return true', () => {
    const cookieData = {
      'nhsNumber': {
        'nhs-number-known': false
      },
      'gender': {
        'gender': 'Male'
      }
    };
    const latestUncompletedStep = getLatestUncompletedStep(cookieData);
    const requestedStepKey = 'name';
    expect(checkStepCompletedBefore(requestedStepKey, latestUncompletedStep)).toEqual(true);
  });

  it('call getNextSlug and return right step slug', () => {
    const cookieData = {
      'nhsNumber': {
        'nhs-number-known': false
      },
      'gender': {
        'gender': 'Male'
      }
    };

    const nextSteps = steps.slice(2);
    expect(getNextSlug(nextSteps, cookieData)).toEqual('name');
  });
});
