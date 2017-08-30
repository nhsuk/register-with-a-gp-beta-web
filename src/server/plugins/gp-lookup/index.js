import _ from 'lodash';
import cookies from '../../config/cookies';
import elasticsearch from './elasticsearch';

function getGPList(keywords) {
  return new Promise((resolve) => {
    const query = {
      query: {
        multi_match: {
          query: keywords,
          fields: ['name^3', 'address^2', 'practitioners.name']
        }
      }
    };

    elasticsearch.search(
      'practice',
      query,
      (error, response) =>{
        let results = [];
        if (response.hits){
          results = response.hits.hits;
        }
        resolve(results);
      }
    );
  });
}


exports.getGPList = getGPList;


function gpLookupHandler(request, reply) {
  const gps = JSON.stringify([{'_index':'gp-lookup','_type':'practice','_id':'J81032','_score':22.547205,'_source':{'organisation_code':'J81032','name':'Newland Surgery','address':'Newland Surgery, Grove Med Ctr, Wootton Gr, Sherborne, Dorset, DT9 4DL','contact_telephone_number':'01935 813438','practitioners':[{'general_medical_practitioner_code':'G8236180','name':'R Lawes','practice':'general-medical-practice:J81032'},{'general_medical_practitioner_code':'G8306151','name':'GM Cutler','practice':'general-medical-practice:J81032'},{'general_medical_practitioner_code':'G8734327','name':'SC Dangerfield','practice':'general-medical-practice:J81032'},{'general_medical_practitioner_code':'G8808127','name':'CA Foster','practice':'general-medical-practice:J81032'},{'general_medical_practitioner_code':'G8910686','name':'NS Fraser','practice':'general-medical-practice:J81032'},{'general_medical_practitioner_code':'G9105849','name':'HC Thomas','practice':'general-medical-practice:J81032'},{'general_medical_practitioner_code':'G9140361','name':'M Grist','practice':'general-medical-practice:J81032'},{'general_medical_practitioner_code':'G9232778','name':'M Phelan','practice':'general-medical-practice:J81032'},{'general_medical_practitioner_code':'G9533668','name':'N Luscombe','practice':'general-medical-practice:J81032'}]}},{'_index':'gp-lookup','_type':'practice','_id':'B87033','_score':21.089989,'_source':{'organisation_code':'B87033','name':'Newland Surgery','address':'Newland Surgery, Newland Lane, Normanton, West Yorkshire, WF6 1QD','contact_telephone_number':'01924 220256','practitioners':[{'general_medical_practitioner_code':'G0717263','name':'JC Gallagher','practice':'general-medical-practice:B87033'},{'general_medical_practitioner_code':'G3380503','name':'RP Gupta','practice':'general-medical-practice:B87033'},{'general_medical_practitioner_code':'G8904676','name':'PK Venugopal','practice':'general-medical-practice:B87033'},{'general_medical_practitioner_code':'G9134306','name':'HS Parikh','practice':'general-medical-practice:B87033'},{'general_medical_practitioner_code':'G9210442','name':'RE Roche','practice':'general-medical-practice:B87033'}]}},{'_index':'gp-lookup','_type':'practice','_id':'C83626','_score':19.049925,'_source':{'organisation_code':'C83626','name':'Brayford Medical Practice','address':'Newland Health Centre, 34 Newland, Lincoln, Lincolnshire, LN1 1XP','contact_telephone_number':'01522 543943','practitioners':[{'general_medical_practitioner_code':'G3254314','name':'EJ Vega','practice':'general-medical-practice:C83626'},{'general_medical_practitioner_code':'G8309336','name':'WAN PO GLTN Li','practice':'general-medical-practice:C83626'},{'general_medical_practitioner_code':'G8409171','name':'M Moszuti','practice':'general-medical-practice:C83626'},{'general_medical_practitioner_code':'G9344347','name':'WAN PO R Li','practice':'general-medical-practice:C83626'}]}},{'_index':'gp-lookup','_type':'practice','_id':'B81048','_score':17.564854,'_source':{'organisation_code':'B81048','name':'The Newland Group','address':'Alexandra Health Care Ctr, 61 Alexandra Road, Kingston Upon Hull, HU5 2NT','contact_telephone_number':'01482 344113','practitioners':[{'general_medical_practitioner_code':'G6713416','name':'M Tufail','practice':'general-medical-practice:B81048'},{'general_medical_practitioner_code':'G7103704','name':'NEWLAND GROUP The','practice':'general-medical-practice:B81048'},{'general_medical_practitioner_code':'G8104926','name':'JP Clark','practice':'general-medical-practice:B81048'},{'general_medical_practitioner_code':'G8313313','name':'AE Parkin','practice':'general-medical-practice:B81048'},{'general_medical_practitioner_code':'G8436612','name':'M Farhod','practice':'general-medical-practice:B81048'},{'general_medical_practitioner_code':'G8901374','name':'JR Lorenz','practice':'general-medical-practice:B81048'},{'general_medical_practitioner_code':'G9609587','name':'DFA Costello','practice':'general-medical-practice:B81048'}]}},{'_index':'gp-lookup','_type':'practice','_id':'C83652','_score':15.172505,'_source':{'organisation_code':'C83652','name':'The Witham Practice','address':'The Witham Practice, Newland H/C,34 Newland, Lincoln, Lincolnshire, LN1 1XP','contact_telephone_number':'01522 544101','practitioners':[{'general_medical_practitioner_code':'G9249363','name':'RM Caruana','practice':'general-medical-practice:C83652'},{'general_medical_practitioner_code':'G9309935','name':'A Caruana','practice':'general-medical-practice:C83652'}]}},{'_index':'gp-lookup','_type':'practice','_id':'F81030','_score':12.775904,'_source':{'organisation_code':'F81030','name':'Fern House Surgery','address':'Fern House Surgery, 129 Newland Street, Witham, Essex, CM8 1BH','contact_telephone_number':'01376 502108','practitioners':[{'general_medical_practitioner_code':'G3151387','name':'DF Davies','practice':'general-medical-practice:F81030'},{'general_medical_practitioner_code':'G8305583','name':'E Teverson','practice':'general-medical-practice:F81030'},{'general_medical_practitioner_code':'G8440187','name':'A Mayet','practice':'general-medical-practice:F81030'},{'general_medical_practitioner_code':'G8514664','name':'DE Beatty','practice':'general-medical-practice:F81030'},{'general_medical_practitioner_code':'G8945314','name':'A Farooqui','practice':'general-medical-practice:F81030'},{'general_medical_practitioner_code':'G9038905','name':'P Afsar','practice':'general-medical-practice:F81030'},{'general_medical_practitioner_code':'G9107607','name':'JP Hopcroft','practice':'general-medical-practice:F81030'},{'general_medical_practitioner_code':'G9147193','name':'NJ Skaria','practice':'general-medical-practice:F81030'},{'general_medical_practitioner_code':'G9305656','name':'RT Summers','practice':'general-medical-practice:F81030'},{'general_medical_practitioner_code':'G9533077','name':'GD Rajarathinam','practice':'general-medical-practice:F81030'},{'general_medical_practitioner_code':'G9909775','name':'CJ Wright','practice':'general-medical-practice:F81030'}]}},{'_index':'gp-lookup','_type':'practice','_id':'B81104','_score':10.403107,'_source':{'organisation_code':'B81104','name':'Nayar Jk','address':'Newland Health Centre, 187 Cottingham Road, Kingston Upon Hull, HU5 2EG','contact_telephone_number':'01482 492219','practitioners':[{'general_medical_practitioner_code':'G8403797','name':'JK Nayar','practice':'general-medical-practice:B81104'},{'general_medical_practitioner_code':'G9048517','name':'S Biwas','practice':'general-medical-practice:B81104'},{'general_medical_practitioner_code':'G9501218','name':'MAARSEVEEN PL Van','practice':'general-medical-practice:B81104'},{'general_medical_practitioner_code':'G9902455','name':'CI Lorences','practice':'general-medical-practice:B81104'}]}}]);
  reply(gps);
  // getGPList(request.query.search)
  //   .then(gps => {
  //     reply(gps);
  //   })
  //   .catch(err => {
  //     request.log(['error'], err);
  //     reply([]);
  //   });
}


exports.register = function(server, options, next) {
  const routeConfig = {
    state: cookies.disableCookies,
  };
  if (options.exposeEndpoint) {
    server.route({
      method: 'GET',
      config: _.merge({}, routeConfig, {id: 'gp-lookup-api'}),
      path: '/gp-lookup',
      handler: gpLookupHandler
    });
  }

  next();
};

exports.register.attributes = {
  name: 'GPLookupRoute',
  version: '1.0.0',
  dependencies: 'NunjucksConfig'
};
