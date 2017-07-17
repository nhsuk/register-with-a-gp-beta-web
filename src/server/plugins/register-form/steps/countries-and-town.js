import JoiBase from 'joi';
import JoiPostcodeExtension from 'joi-postcode';
import {postHandlerFactory, getHandlerFactory} from './common';

const Joi = JoiBase.extend(JoiPostcodeExtension);

const countries = [
	{ label: 'United Kingdom', value: 'United Kingdom' },
	{ label: 'Portugal', value: 'Portugal' },
	{ label: 'Palau', value: 'Palau' },
	{ label: 'Paraguay', value: 'Paraguay' },
	{ label: 'Yemen', value: 'Yemen' },
	{ label: 'Qatar', value: 'Qatar' },
	{ label: 'United Arab Emirates', value: 'United Arab Emirates' },
	{ label: 'South Africa', value: 'South Africa' },
	{ label: 'Zambia', value: 'Zambia' },
	{ label: 'Zimbabwe', value: 'Zimbabwe' },
	{ label: 'Romania', value: 'Romania' },
	{ label: 'Serbia', value: 'Serbia' },
	{ label: 'Russia', value: 'Russia' },
	{ label: 'Rwanda', value: 'Rwanda' },
	{ label: 'Saudi Arabia', value: 'Saudi Arabia' },
	{ label: 'Solomon Islands', value: 'Solomon Islands' },
	{ label: 'Seychelles', value: 'Seychelles' },
	{ label: 'The Bahamas', value: 'The Bahamas' },
	{ label: 'Sudan', value: 'Sudan' },
	{ label: 'Sweden', value: 'Sweden' },
	{ label: 'Singapore', value: 'Singapore' },
	{ label: 'Slovenia', value: 'Slovenia' },
	{ label: 'Slovakia', value: 'Slovakia' },
	{ label: 'Sierra Leone', value: 'Sierra Leone' },
	{ label: 'San Marino', value: 'San Marino' },
	{ label: 'Senegal', value: 'Senegal' },
	{ label: 'Somalia', value: 'Somalia' },
	{ label: 'Suriname', value: 'Suriname' },
	{ label: 'South Sudan', value: 'South Sudan' },
    { label: 'Sao Tome and Principe', value: 'Sao Tome and Principe' },
	{ label: 'St Kitts and Nevis', value: 'St Kitts and Nevis' },
	{ label: 'Switzerland', value: 'Switzerland' },
	{ label: 'Syria', value: 'Syria' },
	{ label: 'Swaziland', value: 'Swaziland' },
	{ label: 'Togo', value: 'Togo' },
	{ label: 'Thailand', value: 'Thailand' },
	{ label: 'Tajikistan', value: 'Tajikistan' },
	{ label: 'Lebanon', value: 'Lebanon' },
	{ label: 'Czechia', value: 'Czechia' },
	{ label: 'St Lucia', value: 'St Lucia' },
	{ label: 'Turkmenistan', value: 'Turkmenistan' },
	{ label: 'Tunisia', value: 'Tunisia' },
	{ label: 'Tonga', value: 'Tonga' },
	{ label: 'Liechtenstein', value: 'Liechtenstein' },
	{ label: 'Turkey', value: 'Turkey' },
	{ label: 'Sri Lanka', value: 'Sri Lanka' },
	{ label: 'Trinidad and Tobago', value: 'Trinidad and Tobago' },
	{ label: 'Tuvalu', value: 'Tuvalu' },
	{ label: 'Tanzania', value: 'Tanzania' },
	{ label: 'Liberia', value: 'Liberia' },
	{ label: 'Lesotho', value: 'Lesotho' },
	{ label: 'Lithuania', value: 'Lithuania' },
	{ label: 'Luxembourg', value: 'Luxembourg' },
	{ label: 'Ukraine', value: 'Ukraine' },
	{ label: 'Libya', value: 'Libya' },
	{ label: 'Uganda', value: 'Uganda' },
	{ label: 'Morocco', value: 'Morocco' },
	{ label: 'Monaco', value: 'Monaco' },
	{ label: 'Moldova', value: 'Moldova' },
	{ label: 'Montenegro', value: 'Montenegro' },
	{ label: 'Madagascar', value: 'Madagascar' },
	{ label: 'Marshall Islands', value: 'Marshall Islands' },
	{ label: 'United States', value: 'United States' },
	{ label: 'Macedonia', value: 'Macedonia' },
	{ label: 'Mali', value: 'Mali' },
	{ label: 'Mongolia', value: 'Mongolia' },
	{ label: 'Uruguay', value: 'Uruguay' },
	{ label: 'Uzbekistan', value: 'Uzbekistan' },
	{ label: 'Mauritania', value: 'Mauritania' },
	{ label: 'Malta', value: 'Malta' },
	{ label: 'Mauritius', value: 'Mauritius' },
	{ label: 'Maldives', value: 'Maldives' },
	{ label: 'Malawi', value: 'Malawi' },
	{ label: 'Vatican City', value: 'Vatican City' },
	{ label: 'Mexico', value: 'Mexico' },
	{ label: 'Malaysia', value: 'Malaysia' },
	{ label: 'St Vincent', value: 'St Vincent' },
	{ label: 'Mozambique', value: 'Mozambique' },
	{ label: 'Spain', value: 'Spain' },
	{ label: 'Venezuela', value: 'Venezuela' },
	{ label: 'Namibia', value: 'Namibia' },
	{ label: 'Niger', value: 'Niger' },
	{ label: 'Vietnam', value: 'Vietnam' },
	{ label: 'Nigeria', value: 'Nigeria' },
	{ label: 'Nicaragua', value: 'Nicaragua' },
	{ label: 'Netherlands', value: 'Netherlands' },
	{ label: 'Vanuatu', value: 'Vanuatu' },
	{ label: 'Norway', value: 'Norway' },
	{ label: 'Nepal', value: 'Nepal' },
	{ label: 'Nauru', value: 'Nauru' },
	{ label: 'Micronesia', value: 'Micronesia' },
	{ label: 'New Zealand', value: 'New Zealand' },
	{ label: 'Samoa', value: 'Samoa' },
	{ label: 'Oman', value: 'Oman' },
	{ label: 'The Gambia', value: 'The Gambia' },
	{ label: 'Panama', value: 'Panama' },
	{ label: 'Peru', value: 'Peru' },
	{ label: 'Papua New Guinea', value: 'Papua New Guinea' },
	{ label: 'Philippines', value: 'Philippines' },
	{ label: 'Pakistan', value: 'Pakistan' },
	{ label: 'Poland', value: 'Poland' }
];

const schema = Joi.object().keys({
  'Country': Joi.string().max(50).label('Country')
    .meta({
      componentType: 'dropdown' ,
      children: countries,
    }),
  'Town': Joi.string().max(50).label('Town').meta({ componentType: 'textbox' }),
  'submit': Joi.any().optional().strip()
});

const title = 'What is your Country and Town?';
const key = 'countryAndTown';
const slug = 'country-and-town';

const handlers = {
  GET: (prevSteps) => getHandlerFactory(key, title, schema, prevSteps),
  POST: (prevSteps, nextSteps) => postHandlerFactory(key, title, schema, prevSteps, nextSteps),
};

/**
 * @type Step
 */
export default {
  key,
  slug,
  title,
  schema,
  handlers
};
