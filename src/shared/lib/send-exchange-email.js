import EWS from 'node-ews';


function consoleEmail(toEmail, text, subject) {
  /* eslint-disable no-console */
  console.log(toEmail, text, subject);
  /* eslint-enable no-console */
  return new Promise((resolve) => {
    setTimeout(resolve, 100);
  });
}

function ewsEmail(toEmail, text, subject) {
  const ews = new EWS({
    username: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD,
    host: process.env.EMAIL_HOST
  });

  const ewsFunction = 'CreateItem';

  const ewsArgs = {
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
        'Subject' : subject,
        'Body' : {
          'attributes': {
            'BodyType' : 'HTML'
          },
          '$value': text
        },
        'ToRecipients' : {
          'Mailbox' : {
            'EmailAddress' : toEmail
          }
        },
        'IsRead': 'false'
      }
    }
  };

  return ews.run(ewsFunction, ewsArgs);
}


export default function(toEmail, text, subject) {
  return consoleEmail(toEmail, text, subject);
}
