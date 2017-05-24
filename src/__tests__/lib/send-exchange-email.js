import sendEmail from '../../shared/lib/send-exchange-email';


const expectedEwsArgs = {
  'attributes' : {
    'MessageDisposition' : 'SendAndSaveCopy'
  },
  'SavedItemFolderId': {
    'DistinguishedFolderId': {
      'attributes': {
        'Id': 'sentitems'
      }
    }
  },
  'Items' : {
    'Message' : {
      'ItemClass': 'IPM.Note',
      'Subject' : 'Test Email Subject',
      'Body' : {
        'attributes': {
          'BodyType' : 'HTML'
        },
        '$value': 'Test email'
      },
      'ToRecipients' : {
        'Mailbox' : {
          'EmailAddress' : 'test@test.com'
        }
      },
      'IsRead': 'false'
    }
  }
};


describe('send exchange email', () => {

  it('should be called with correct args', () => {
    return sendEmail(
      'test@test.com',
      'Test email',
      'Test Email Subject'
    ).then((args) => {
      expect(args.ewsFunction).toBe('CreateItem');
      expect(args.ewsArgs).toEqual(expectedEwsArgs);
    });
  });

});
