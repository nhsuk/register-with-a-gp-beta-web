import JoiBase from 'joi';
import JoiPostcodeExtension from 'joi-postcode';
import {postHandlerFactory, getHandlerFactory} from './common';

const Joi = JoiBase.extend(JoiPostcodeExtension);


const COUNTRIES = [
	{ label: 'United Kingdom', value: 'United Kingdom' },
	{ label: 'Czechia', value: 'Czechia' },
	{ label: 'Lebanon', value: 'Lebanon' },
	{ label: 'Lesotho', value: 'Lesotho' },
	{ label: 'Liberia', value: 'Liberia' },
	{ label: 'Libya', value: 'Libya' },
	{ label: 'Liechtenstein', value: 'Liechtenstein' },
	{ label: 'Lithuania', value: 'Lithuania' },
	{ label: 'Luxembourg', value: 'Luxembourg' },
	{ label: 'Macedonia', value: 'Macedonia' },
	{ label: 'Madagascar', value: 'Madagascar' },
	{ label: 'Malawi', value: 'Malawi' },
	{ label: 'Malaysia', value: 'Malaysia' },
	{ label: 'Maldives', value: 'Maldives' },
	{ label: 'Mali', value: 'Mali' },
	{ label: 'Malta', value: 'Malta' },
	{ label: 'Marshall Islands', value: 'Marshall Islands' },
	{ label: 'Mauritania', value: 'Mauritania' },
	{ label: 'Mauritius', value: 'Mauritius' },
	{ label: 'Mexico', value: 'Mexico' },
	{ label: 'Micronesia', value: 'Micronesia' },
	{ label: 'Moldova', value: 'Moldova' },
	{ label: 'Monaco', value: 'Monaco' },
	{ label: 'Mongolia', value: 'Mongolia' },
	{ label: 'Montenegro', value: 'Montenegro' },
	{ label: 'Morocco', value: 'Morocco' },
	{ label: 'Mozambique', value: 'Mozambique' },
	{ label: 'Namibia', value: 'Namibia' },
	{ label: 'Nauru', value: 'Nauru' },
	{ label: 'Nepal', value: 'Nepal' },
	{ label: 'Netherlands', value: 'Netherlands' },
	{ label: 'New Zealand', value: 'New Zealand' },
	{ label: 'Nicaragua', value: 'Nicaragua' },
	{ label: 'Niger', value: 'Niger' },
	{ label: 'Nigeria', value: 'Nigeria' },
	{ label: 'Norway', value: 'Norway' },
	{ label: 'Oman', value: 'Oman' },
	{ label: 'Pakistan', value: 'Pakistan' },
	{ label: 'Palau', value: 'Palau' },
	{ label: 'Panama', value: 'Panama' },
	{ label: 'Papua New Guinea', value: 'Papua New Guinea' },
	{ label: 'Paraguay', value: 'Paraguay' },
	{ label: 'Peru', value: 'Peru' },
	{ label: 'Philippines', value: 'Philippines' },
	{ label: 'Poland', value: 'Poland' },
	{ label: 'Portugal', value: 'Portugal' },
	{ label: 'Qatar', value: 'Qatar' },
	{ label: 'Romania', value: 'Romania' },
	{ label: 'Russia', value: 'Russia' },
	{ label: 'Rwanda', value: 'Rwanda' },
	{ label: 'Samoa', value: 'Samoa' },
	{ label: 'San Marino', value: 'San Marino' },
	{ label: 'Sao Tome and Principe', value: 'Sao Tome and Principe' },
	{ label: 'Saudi Arabia', value: 'Saudi Arabia' },
	{ label: 'Senegal', value: 'Senegal' },
	{ label: 'Serbia', value: 'Serbia' },
	{ label: 'Seychelles', value: 'Seychelles' },
	{ label: 'Sierra Leone', value: 'Sierra Leone' },
	{ label: 'Singapore', value: 'Singapore' },
	{ label: 'Slovakia', value: 'Slovakia' },
	{ label: 'Slovenia', value: 'Slovenia' },
	{ label: 'Solomon Islands', value: 'Solomon Islands' },
	{ label: 'Somalia', value: 'Somalia' },
	{ label: 'South Africa', value: 'South Africa' },
	{ label: 'South Sudan', value: 'South Sudan' },
	{ label: 'Spain', value: 'Spain' },
	{ label: 'Sri Lanka', value: 'Sri Lanka' },
	{ label: 'St Kitts and Nevis', value: 'St Kitts and Nevis' },
	{ label: 'St Lucia', value: 'St Lucia' },
	{ label: 'St Vincent', value: 'St Vincent' },
	{ label: 'Sudan', value: 'Sudan' },
	{ label: 'Suriname', value: 'Suriname' },
	{ label: 'Swaziland', value: 'Swaziland' },
	{ label: 'Sweden', value: 'Sweden' },
	{ label: 'Switzerland', value: 'Switzerland' },
	{ label: 'Syria', value: 'Syria' },
	{ label: 'Tajikistan', value: 'Tajikistan' },
	{ label: 'Tanzania', value: 'Tanzania' },
	{ label: 'Thailand', value: 'Thailand' },
	{ label: 'The Bahamas', value: 'The Bahamas' },
	{ label: 'The Gambia', value: 'The Gambia' },
	{ label: 'Togo', value: 'Togo' },
	{ label: 'Tonga', value: 'Tonga' },
	{ label: 'Trinidad and Tobago', value: 'Trinidad and Tobago' },
	{ label: 'Tunisia', value: 'Tunisia' },
	{ label: 'Turkey', value: 'Turkey' },
	{ label: 'Turkmenistan', value: 'Turkmenistan' },
	{ label: 'Tuvalu', value: 'Tuvalu' },
	{ label: 'Uganda', value: 'Uganda' },
	{ label: 'Ukraine', value: 'Ukraine' },
	{ label: 'United Arab Emirates', value: 'United Arab Emirates' },
	{ label: 'United Kingdom', value: 'United Kingdom' },
	{ label: 'United States', value: 'United States' },
	{ label: 'Uruguay', value: 'Uruguay' },
	{ label: 'Uzbekistan', value: 'Uzbekistan' },
	{ label: 'Vanuatu', value: 'Vanuatu' },
	{ label: 'Vatican City', value: 'Vatican City' },
	{ label: 'Venezuela', value: 'Venezuela' },
	{ label: 'Vietnam', value: 'Vietnam' },
	{ label: 'Yemen', value: 'Yemen' },
	{ label: 'Zambia', value: 'Zambia' },
	{ label: 'Zimbabwe', value: 'Zimbabwe' },
];

const schema = Joi.object().keys({
  'country': Joi.string().max(50).label('Country')
		.meta({
  componentType: 'dropdown' ,
  children: COUNTRIES,
}),
  'town': Joi.string().max(50).label('Town or City').meta({ componentType: 'textbox' }),
  'submit': Joi.any().optional().strip()
});

const title = 'Where were you born?';
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
