const currencyMap = {
    "Afghanistan": {
        "abbreviation": "AF",
        "currency": "USD",
    },
    "Albania": {
        "abbreviation": "AL",
        "currency": "USD",
    },
    "Algeria": {
        "abbreviation": "DZ",
        "currency": "DZD",
    },
    "American Samoa": {
        "abbreviation": "AS",
        "currency": "USD",
    },
    "Andorra": {
        "abbreviation": "AD",
        "currency": "EUR",
    },
    "Angola": {
        "abbreviation": "AO",
        "currency": "USD",
    },
    "Anguilla": {
        "abbreviation": "AI",
        "currency": "USD",
    },
    "Antarctica": {
        "abbreviation": "AQ",
        "currency": "USD",
    },
    "Antigua And Barbuda": {
        "abbreviation": "AG",
        "currency": "XCD",
    },
    "Argentina": {
        "abbreviation": "AR",
        "currency": "ARS",
    },
    "Armenia": {
        "abbreviation": "AM",
        "currency": "AMD",
    },
    "Aruba": {
        "abbreviation": "AW",
        "currency": "AWG",
    },
    "Ascension Island": {
        "abbreviation": "AC",
        "currency": "USD",
    },
    "Australia": {
        "abbreviation": "AU",
        "currency": "AUD",
    },
    "Austria": {
        "abbreviation": "AT",
        "currency": "EUR",
    },
    "Azerbaijan": {
        "abbreviation": "AZ",
        "currency": "USD",
    },
    "Bahamas": {
        "abbreviation": "BS",
        "currency": "USD",
    },
    "Bahrain": {
        "abbreviation": "BH",
        "currency": "BHD",
    },
    "Bangladesh": {
        "abbreviation": "BD",
        "currency": "BDT",
    },
    "Barbados": {
        "abbreviation": "BB",
        "currency": "BBD",
    },
    "Belarus": {
        "abbreviation": "BY",
        "currency": "USD",
    },
    "Belgium": {
        "abbreviation": "BE",
        "currency": "EUR",
    },
    "Belize": {
        "abbreviation": "BZ",
        "currency": "BZD",
    },
    "Benin": {
        "abbreviation": "BJ",
        "currency": "USD",
    },
    "Bermuda": {
        "abbreviation": "BM",
        "currency": "USD",
    },
    "Bhutan": {
        "abbreviation": "BT",
        "currency": "BTN",
    },
    "Bolivia": {
        "abbreviation": "BO",
        "currency": "USD",
    },
    "Bosnia And Herzegowina": {
        "abbreviation": "BA",
        "currency": "USD",
    },
    "Botswana": {
        "abbreviation": "BW",
        "currency": "BWP",
    },
    "Bouvet Island": {
        "abbreviation": "BV",
        "currency": "USD",
    },
    "Brazil": {
        "abbreviation": "BR",
        "currency": "BRL",
    },
    "British Indian Ocean Territory": {
        "abbreviation": "IO",
        "currency": "USD",
    },
    "Brunei Darussalam": {
        "abbreviation": "BN",
        "currency": "BND",
    },
    "Bulgaria": {
        "abbreviation": "BG",
        "currency": "BGN",
    },
    "Burkina Faso": {
        "abbreviation": "BF",
        "currency": "USD",
    },
    "Burundi": {
        "abbreviation": "BI",
        "currency": "USD",
    },
    "Cambodia": {
        "abbreviation": "KH",
        "currency": "USD",
    },
    "Cameroon": {
        "abbreviation": "CM",
        "currency": "XAF",
    },
    "Canada": {
        "abbreviation": "CA",
        "currency": "CAD",
    },
    "Cape Verde": {
        "abbreviation": "CV",
        "currency": "USD",
    },
    "Cayman Islands": {
        "abbreviation": "KY",
        "currency": "USD",
    },
    "Central African Republic": {
        "abbreviation": "CF",
        "currency": "USD",
    },
    "Chad": {
        "abbreviation": "TD",
        "currency": "USD",
    },
    "Chile": {
        "abbreviation": "CL",
        "currency": "USD",
    },
    "China": {
        "abbreviation": "CN",
        "currency": "CNY",
    },
    "Christmas Island": {
        "abbreviation": "CX",
        "currency": "USD",
    },
    "Cocos (Keeling) Islands": {
        "abbreviation": "CC",
        "currency": "USD",
    },
    "Colombia": {
        "abbreviation": "CO",
        "currency": "COP",
    },
    "Comoros": {
        "abbreviation": "KM",
        "currency": "USD",
    },
    "Congo": {
        "abbreviation": "CG",
        "currency": "USD",
    },
    "Congo, Democratic People's Republic": {
        "abbreviation": "CD",
        "currency": "USD",
    },
    "Cook Islands": {
        "abbreviation": "CK",
        "currency": "NZD",
    },
    "Costa Rica": {
        "abbreviation": "CR",
        "currency": "CRC",
    },
    "Cote d'Ivoire": {
        "abbreviation": "CI",
        "currency": "XOF",
    },
    "Croatia (local name: Hrvatska)": {
        "abbreviation": "HR",
        "currency": "HRK",
    },
    "Cuba": {
        "abbreviation": "CU",
        "currency": "USD",
    },
    "Cyprus": {
        "abbreviation": "CY",
        "currency": "EUR",
    },
    "Czech Republic": {
        "abbreviation": "CZ",
        "currency": "CZK",
    },
    "Denmark": {
        "abbreviation": "DK",
        "currency": "DKK",
    },
    "Djibouti": {
        "abbreviation": "DJ",
        "currency": "USD",
    },
    "Dominica": {
        "abbreviation": "DM",
        "currency": "XCD",
    },
    "Dominican Republic": {
        "abbreviation": "DO",
        "currency": "DOP",
    },
    "East Timor": {
        "abbreviation": "TP",
        "currency": "USD",
    },
    "Ecuador": {
        "abbreviation": "EC",
        "currency": "USD",
    },
    "Egypt": {
        "abbreviation": "EG",
        "currency": "EGP",
    },
    "El Salvador": {
        "abbreviation": "SV",
        "currency": "USD",
    },
    "Equatorial Guinea": {
        "abbreviation": "GQ",
        "currency": "USD",
    },
    "Eritrea": {
        "abbreviation": "ER",
        "currency": "ERN",
    },
    "Estonia": {
        "abbreviation": "EE",
        "currency": "EUR",
    },
    "Ethiopia": {
        "abbreviation": "ET",
        "currency": "ETB",
    },
    "Falkland Islands (Malvinas)": {
        "abbreviation": "FK",
        "currency": "FKP",
    },
    "Faroe Islands": {
        "abbreviation": "FO",
        "currency": "DKK",
    },
    "Fiji": {
        "abbreviation": "FJ",
        "currency": "FJD",
    },
    "Finland": {
        "abbreviation": "FI",
        "currency": "EUR",
    },
    "France": {
        "abbreviation": "FR",
        "currency": "EUR",
    },
    "French Guiana": {
        "abbreviation": "GF",
        "currency": "EUR",
    },
    "French Polynesia": {
        "abbreviation": "PF",
        "currency": "USD",
    },
    "French Southern Territories": {
        "abbreviation": "TF",
        "currency": "EUR",
    },
    "Gabon": {
        "abbreviation": "GA",
        "currency": "USD",
    },
    "Gambia": {
        "abbreviation": "GM",
        "currency": "GMD",
    },
    "Georgia (Sakartvelo)": {
        "abbreviation": "GE",
        "currency": "USD",
    },
    "Germany": {
        "abbreviation": "DE",
        "currency": "EUR",
    },
    "Ghana": {
        "abbreviation": "GH",
        "currency": "GHC",
    },
    "Gibraltar": {
        "abbreviation": "GI",
        "currency": "GBP",
    },
    "Greece": {
        "abbreviation": "GR",
        "currency": "EUR",
    },
    "Greenland": {
        "abbreviation": "GL",
        "currency": "DKK",
    },
    "Grenada": {
        "abbreviation": "GD",
        "currency": "XCD",
    },
    "Guadeloupe": {
        "abbreviation": "GP",
        "currency": "USD",
    },
    "Guam": {
        "abbreviation": "GU",
        "currency": "USD",
    },
    "Guatemala": {
        "abbreviation": "GT",
        "currency": "GTQ",
    },
    "Guernsey": {
        "abbreviation": "GG",
        "currency": "GBP",
    },
    "Guinea": {
        "abbreviation": "GN",
        "currency": "USD",
    },
    "Guinea-Bissau": {
        "abbreviation": "GW",
        "currency": "USD",
    },
    "Guyana": {
        "abbreviation": "GY",
        "currency": "GYD",
    },
    "Haiti": {
        "abbreviation": "HT",
        "currency": "USD",
    },
    "Heard And Mc Donald Islands": {
        "abbreviation": "HM",
        "currency": "USD",
    },
    "Honduras": {
        "abbreviation": "HN",
        "currency": "HNL",
    },
    "Hong Kong": {
        "abbreviation": "HK",
        "currency": "HKD",
    },
    "Hungary": {
        "abbreviation": "HU",
        "currency": "HUF",
    },
    "Iceland": {
        "abbreviation": "IS",
        "currency": "ISK",
    },
    "India": {
        "abbreviation": "IN",
        "currency": "INR",
    },
    "Indonesia": {
        "abbreviation": "ID",
        "currency": "IDR",
    },
    "Iran (Islamic Republic Of)": {
        "abbreviation": "IR",
        "currency": "IRR",
    },
    "Iraq": {
        "abbreviation": "IQ",
        "currency": "USD",
    },
    "Ireland": {
        "abbreviation": "IE",
        "currency": "EUR",
    },
    "Isle of Man": {
        "abbreviation": "IM",
        "currency": "GBP",
    },
    "Israel": {
        "abbreviation": "IL",
        "currency": "ILS",
    },
    "Italy": {
        "abbreviation": "IT",
        "currency": "EUR",
    },
    "Jamaica": {
        "abbreviation": "JM",
        "currency": "JMD",
    },
    "Japan": {
        "abbreviation": "JP",
        "currency": "JPY",
    },
    "Jersey (Island)": {
        "abbreviation": "JE",
        "currency": "GBP",
    },
    "Jordan": {
        "abbreviation": "JO",
        "currency": "JOD",
    },
    "Kazakhstan": {
        "abbreviation": "KZ",
        "currency": "USD",
    },
    "Kenya": {
        "abbreviation": "KE",
        "currency": "KES",
    },
    "Kiribati": {
        "abbreviation": "KI",
        "currency": "USD",
    },
    "Korea, Democratic People's Republic Of": {
        "abbreviation": "KP",
        "currency": "USD",
    },
    "Korea, Republic Of": {
        "abbreviation": "KR",
        "currency": "USD",
    },
    "Kuwait": {
        "abbreviation": "KW",
        "currency": "KWD",
    },
    "Kyrgyzstan": {
        "abbreviation": "KG",
        "currency": "USD",
    },
    "Lao People's Democratic Republic": {
        "abbreviation": "LA",
        "currency": "USD",
    },
    "Latvia": {
        "abbreviation": "LV",
        "currency": "USD",
    },
    "Lebanon": {
        "abbreviation": "LB",
        "currency": "LBP",
    },
    "Lesotho": {
        "abbreviation": "LS",
        "currency": "ZAR",
    },
    "Liberia": {
        "abbreviation": "LR",
        "currency": "USD",
    },
    "Libyan Arab Jamahiriya": {
        "abbreviation": "LY",
        "currency": "USD",
    },
    "Liechtenstein": {
        "abbreviation": "LI",
        "currency": "CHF",
    },
    "Lithuania": {
        "abbreviation": "LT",
        "currency": "USD",
    },
    "Luxembourg": {
        "abbreviation": "LU",
        "currency": "EUR",
    },
    "Macau": {
        "abbreviation": "MO",
        "currency": "MOP",
    },
    "Macedonia, The Former Yugoslav Republic Of": {
        "abbreviation": "MK",
        "currency": "MKD",
    },
    "Madagascar": {
        "abbreviation": "MG",
        "currency": "USD",
    },
    "Malawi": {
        "abbreviation": "MW",
        "currency": "MWK",
    },
    "Malaysia": {
        "abbreviation": "MY",
        "currency": "MYR",
    },
    "Maldives": {
        "abbreviation": "MV",
        "currency": "USD",
    },
    "Mali": {
        "abbreviation": "ML",
        "currency": "USD",
    },
    "Malta": {
        "abbreviation": "MT",
        "currency": "EUR",
    },
    "Marshall Islands": {
        "abbreviation": "MH",
        "currency": "USD",
    },
    "Martinique": {
        "abbreviation": "MQ",
        "currency": "EUR",
    },
    "Mauritania": {
        "abbreviation": "MR",
        "currency": "USD",
    },
    "Mauritius": {
        "abbreviation": "MU",
        "currency": "MUR",
    },
    "Mayotte": {
        "abbreviation": "YT",
        "currency": "EUR",
    },
    "Mexico": {
        "abbreviation": "MX",
        "currency": "MXN",
    },
    "Micronesia, Federated States Of": {
        "abbreviation": "FM",
        "currency": "USD",
    },
    "Moldova, Republic Of": {
        "abbreviation": "MD",
        "currency": "USD",
    },
    "Monaco": {
        "abbreviation": "MC",
        "currency": "EUR",
    },
    "Mongolia": {
        "abbreviation": "MN",
        "currency": "USD",
    },
    "Montserrat": {
        "abbreviation": "MS",
        "currency": "XCD",
    },
    "Morocco": {
        "abbreviation": "MA",
        "currency": "MAD",
    },
    "Mozambique": {
        "abbreviation": "MZ",
        "currency": "USD",
    },
    "Myanmar": {
        "abbreviation": "MM",
        "currency": "USD",
    },
    "Namibia": {
        "abbreviation": "NA",
        "currency": "NAD",
    },
    "Nauru": {
        "abbreviation": "NR",
        "currency": "AUD",
    },
    "Nepal": {
        "abbreviation": "NP",
        "currency": "NPR",
    },
    "Netherlands": {
        "abbreviation": "NL",
        "currency": "EUR",
    },
    "Netherlands Antilles": {
        "abbreviation": "AN",
        "currency": "ANG",
    },
    "New Caledonia": {
        "abbreviation": "NC",
        "currency": "USD",
    },
    "New Zealand": {
        "abbreviation": "NZ",
        "currency": "NZD",
    },
    "Nicaragua": {
        "abbreviation": "NI",
        "currency": "NIO",
    },
    "Niger": {
        "abbreviation": "NE",
        "currency": "USD",
    },
    "Nigeria": {
        "abbreviation": "NG",
        "currency": "NGN",
    },
    "Niue": {
        "abbreviation": "NU",
        "currency": "NZD",
    },
    "Norfolk Island": {
        "abbreviation": "NF",
        "currency": "AUD",
    },
    "Northern Mariana Islands": {
        "abbreviation": "MP",
        "currency": "USD",
    },
    "Norway": {
        "abbreviation": "NO",
        "currency": "NOK",
    },
    "Oman": {
        "abbreviation": "OM",
        "currency": "OMR",
    },
    "Pakistan": {
        "abbreviation": "PK",
        "currency": "PKR",
    },
    "Palau": {
        "abbreviation": "PW",
        "currency": "USD",
    },
    "Palestinian Territories": {
        "abbreviation": "PS",
        "currency": "USD",
    },
    "Panama": {
        "abbreviation": "PA",
        "currency": "PAB",
    },
    "Papua New Guinea": {
        "abbreviation": "PG",
        "currency": "PGK",
    },
    "Paraguay": {
        "abbreviation": "PY",
        "currency": "PYG",
    },
    "Peru": {
        "abbreviation": "PE",
        "currency": "USD",
    },
    "Philippines": {
        "abbreviation": "PH",
        "currency": "PHP",
    },
    "Pitcairn": {
        "abbreviation": "PN",
        "currency": "USD",
    },
    "Poland": {
        "abbreviation": "PL",
        "currency": "PLN",
    },
    "Portugal": {
        "abbreviation": "PT",
        "currency": "EUR",
    },
    "Puerto Rico": {
        "abbreviation": "PR",
        "currency": "USD",
    },
    "Qatar": {
        "abbreviation": "QA",
        "currency": "QAR",
    },
    "Reunion": {
        "abbreviation": "RE",
        "currency": "USD",
    },
    "Romania": {
        "abbreviation": "RO",
        "currency": "USD",
    },
    "Russia": {
        "abbreviation": "RU",
        "currency": "RUB",
    },
    "Rwanda": {
        "abbreviation": "RW",
        "currency": "USD",
    },
    "Saint Kitts And Nevis": {
        "abbreviation": "KN",
        "currency": "XCD",
    },
    "Saint Lucia": {
        "abbreviation": "LC",
        "currency": "XCD",
    },
    "Saint Vincent And The Grenadines": {
        "abbreviation": "VC",
        "currency": "XCD",
    },
    "Samoa": {
        "abbreviation": "WS",
        "currency": "WST",
    },
    "San Marino": {
        "abbreviation": "SM",
        "currency": "EUR",
    },
    "Sao Tome And Principe": {
        "abbreviation": "ST",
        "currency": "USD",
    },
    "Saudi Arabia": {
        "abbreviation": "SA",
        "currency": "SAR",
    },
    "Senegal": {
        "abbreviation": "SN",
        "currency": "USD",
    },
    "Serbia and Montenegro": {
        "abbreviation": "CS",
        "currency": "EUR",
    },
    "Seychelles": {
        "abbreviation": "SC",
        "currency": "USD",
    },
    "Sierra Leone": {
        "abbreviation": "SL",
        "currency": "USD",
    },
    "Singapore": {
        "abbreviation": "SG",
        "currency": "SGD",
    },
    "Slovakia (Slovak Republic)": {
        "abbreviation": "SK",
        "currency": "USD",
    },
    "Slovenia": {
        "abbreviation": "SI",
        "currency": "EUR",
    },
    "Solomon Islands": {
        "abbreviation": "SB",
        "currency": "SBD",
    },
    "Somalia": {
        "abbreviation": "SO",
        "currency": "USD",
    },
    "South Africa": {
        "abbreviation": "ZA",
        "currency": "ZAR",
    },
    "South Georgia And The South Sandwich Islands": {
        "abbreviation": "GS",
        "currency": "USD",
    },
    "Spain": {
        "abbreviation": "ES",
        "currency": "EUR",
    },
    "Sri Lanka": {
        "abbreviation": "LK",
        "currency": "LKR",
    },
    "St. Helena": {
        "abbreviation": "SH",
        "currency": "USD",
    },
    "St. Pierre And Miquelon": {
        "abbreviation": "PM",
        "currency": "USD",
    },
    "Sudan": {
        "abbreviation": "SD",
        "currency": "USD",
    },
    "Suriname": {
        "abbreviation": "SR",
        "currency": "USD",
    },
    "Svalbard And Jan Mayen Islands": {
        "abbreviation": "SJ",
        "currency": "USD",
    },
    "Swaziland": {
        "abbreviation": "SZ",
        "currency": "SZL",
    },
    "Sweden": {
        "abbreviation": "SE",
        "currency": "SEK",
    },
    "Switzerland": {
        "abbreviation": "CH",
        "currency": "CHF",
    },
    "Syrian Arab Republic": {
        "abbreviation": "SY",
        "currency": "SYP",
    },
    "Taiwan": {
        "abbreviation": "TW",
        "currency": "TWD",
    },
    "Tajikistan": {
        "abbreviation": "TJ",
        "currency": "USD",
    },
    "Tanzania, United Republic Of": {
        "abbreviation": "TZ",
        "currency": "TZS",
    },
    "Thailand": {
        "abbreviation": "TH",
        "currency": "THB",
    },
    "Togo": {
        "abbreviation": "TG",
        "currency": "USD",
    },
    "Tokelau": {
        "abbreviation": "TK",
        "currency": "USD",
    },
    "Tonga": {
        "abbreviation": "TO",
        "currency": "TOP",
    },
    "Trinidad And Tobago": {
        "abbreviation": "TT",
        "currency": "TTD",
    },
    "Tunisia": {
        "abbreviation": "TN",
        "currency": "TND",
    },
    "Turkey": {
        "abbreviation": "TR",
        "currency": "USD",
    },
    "Turkmenistan": {
        "abbreviation": "TM",
        "currency": "USD",
    },
    "Turks And Caicos Islands": {
        "abbreviation": "TC",
        "currency": "USD",
    },
    "Tuvalu": {
        "abbreviation": "TV",
        "currency": "USD",
    },
    "U.S. Minor Outlying Islands": {
        "abbreviation": "UM",
        "currency": "USD",
    },
    "Uganda": {
        "abbreviation": "UG",
        "currency": "UGX",
    },
    "Ukraine": {
        "abbreviation": "UA",
        "currency": "UAH",
    },
    "United Arab Emirates": {
        "abbreviation": "AE",
        "currency": "AED",
    },
    "United Kingdom": {
        "abbreviation": "UK",
        "currency": "GBP",
    },
    "United States": {
        "abbreviation": "US",
        "currency": "USD",
    },
    "Uruguay": {
        "abbreviation": "UY",
        "currency": "USD",
    },
    "Uzbekistan": {
        "abbreviation": "UZ",
        "currency": "USD",
    },
    "Vanuatu": {
        "abbreviation": "VU",
        "currency": "VUV",
    },
    "Vatican City State (Holy See)": {
        "abbreviation": "VA",
        "currency": "USD",
    },
    "Venezuela": {
        "abbreviation": "VE",
        "currency": "VEB",
    },
    "Viet Nam": {
        "abbreviation": "VN",
        "currency": "USD",
    },
    "Virgin Islands (British)": {
        "abbreviation": "VG",
        "currency": "USD",
    },
    "Virgin Islands (U.S.)": {
        "abbreviation": "VI",
        "currency": "USD",
    },
    "Wallis And Futuna Islands": {
        "abbreviation": "WF",
        "currency": "USD",
    },
    "Western Sahara": {
        "abbreviation": "EH",
        "currency": "USD",
    },
    "Yemen": {
        "abbreviation": "YE",
        "currency": "USD",
    },
    "Zambia": {
        "abbreviation": "ZM",
        "currency": "USD",
    },
    "Zimbabwe": {
        "abbreviation": "ZW",
        "currency": "USD",
    },
};

const currencyInfo = {
    AFA: {
        name: "Afghanistan Afghani (AFA)",
        symbolFormat: "{#} ؋",
    },
    ALL: {
        name: "Albanian Lek (ALL)",
        symbolFormat: "{#} L",
    },
    DZD: {
        name: "Algerian Dinar (DZD)",
        symbolFormat: "{#} DA",
    },
    AOA: {
        name: "Angolan New Kwanza (AOA)",
        symbolFormat: "{#} Kz",
    },
    ARS: {
        name: "Argentine Peso (ARS)",
        symbolFormat: "${#}",
    },
    AMD: {
        name: "Armenian Dram (AMD)",
        symbolFormat: "{#}֏",
    },
    AWG: {
        name: "Aruba Florin (AWG)",
        symbolFormat: "Afl {#}",
    },
    AUD: {
        name: "Australian Dollar (AUD)",
        symbolFormat: "AU${#}",
    },
    AZM: {
        name: "Azerbaijani Manat (AZM)",
        symbolFormat: "₼{#}",
    },
    BSD: {
        name: "Bahamian Dollar (BSD)",
        symbolFormat: "B${#}",
    },
    BHD: {
        name: "Bahraini Dinar (BHD)",
        symbolFormat: "{#} BD",
    },
    BDT: {
        name: "Bangladesh Taka (BDT)",
        symbolFormat: "৳{#}",
    },
    BBD: {
        name: "Barbados Dollar (BBD)",
        symbolFormat: "Bds${#}",
    },
    BYR: {
        name: "Belarus Ruble (BYR)",
        symbolFormat: "Br {#}",
    },
    BZD: {
        name: "Belize Dollar (BZD)",
        symbolFormat: "BZ${#}",
    },
    BMD: {
        name: "Bermuda Dollar (BMD)",
        symbolFormat: "${#}",
    },
    BTN: {
        name: "Bhutan Ngultrum (BTN)",
        symbolFormat: "Nu.{#}",
    },
    BOB: {
        name: "Bolivian Boliviano (BOB)",
        symbolFormat: "Bs. {#}",
    },
    BAM: {
        name: "Bosnian Marka (BAM)",
        symbolFormat: "{#} KM",
    },
    BWP: {
        name: "Botswana Pula (BWP)",
        symbolFormat: "P {#}",
    },
    BRL: {
        name: "Brazilian Real (BRL)",
        symbolFormat: "R${#}",
    },
    GBP: {
        name: "British Pound (GBP)",
        symbolFormat: "&pound;{#}",
    },
    BND: {
        name: "Brunei Dollar (BND)",
        symbolFormat: "B${#}",
    },
    BGN: {
        name: "Bulgarian Lev (BGN)",
        symbolFormat: "BGN {#}",
    },
    BIF: {
        name: "Burundi Franc (BIF)",
        symbolFormat: "{#} FBu",
    },
    KHR: {
        name: "Cambodia Riel (KHR)",
        symbolFormat: "KHR {#}",
    },
    CAD: {
        name: "Canadian Dollar (CAD)",
        symbolFormat: "C${#}",
    },
    CVE: {
        name: "Cape Verde Escudo (CVE)",
        symbolFormat: "{#} CVE",
    },
    KYD: {
        name: "Cayman Islands Dollar (KYD)",
        symbolFormat: "CI${#}",
    },
    XOF: {
        name: "CFA Franc (BCEAO) (XOF)",
        symbolFormat: "XOF {#}",
    },
    XAF: {
        name: "CFA Franc (BEAC) (XAF)",
        symbolFormat: "XAF {#}",
    },
    CLP: {
        name: "Chilean Peso (CLP)",
        symbolFormat: "CLP${#}",
    },
    CNY: {
        name: "Chinese Yuan (CNY)",
        symbolFormat: "¥{#}",
    },
    COP: {
        name: "Colombian Peso (COP)",
        symbolFormat: "COL${#}",
    },
    KMF: {
        name: "Comoros Franc (KMF)",
        symbolFormat: "CF {#}",
    },
    CDF: {
        name: "Congolese Franc (CDF)",
        symbolFormat: "FC {#}",
    },
    CRC: {
        name: "Costa Rica Colon (CRC)",
        symbolFormat: "₡{#}",
    },
    HRK: {
        name: "Croatian Kuna (HRK)",
        symbolFormat: "{#} kn",
    },
    CUP: {
        name: "Cuban Peso (CUP)",
        symbolFormat: "${#}",
    },
    CZK: {
        name: "Czech Koruna (CZK)",
        symbolFormat: "{#} Kč",
    },
    DKK: {
        name: "Danish Krone (DKK)",
        symbolFormat: "{#} Kr.",
    },
    DJF: {
        name: "Dijibouti Franc (DJF)",
        symbolFormat: "{#} Fdj",
    },
    DOP: {
        name: "Dominican Peso (DOP)",
        symbolFormat: "RD${#}",
    },
    XCD: {
        name: "East Caribbean Dollar (XCD)",
        symbolFormat: "${#}",
    },
    EGP: {
        name: "Egyptian Pound (EGP)",
        symbolFormat: "E&pound; {#}",
    },
    SVC: {
        name: "El Salvador Colon (SVC)",
        symbolFormat: "₡{#}",
    },
    ERN: {
        name: "Eritrea Nakfa (ERN)",
        symbolFormat: "{#} Nkf",
    },
    ETB: {
        name: "Ethiopian Birr (ETB)",
        symbolFormat: "{#} Br",
    },
    EUR: {
        name: "Euro (EUR)",
        symbolFormat: "&euro;{#}",
    },
    FKP: {
        name: "Falkland Islands Pound (FKP)",
        symbolFormat: "FK&pound; {#}",
    },
    FJD: {
        name: "Fiji Dollar (FJD)",
        symbolFormat: "FJ${#}",
    },
    GMD: {
        name: "Gambian Dalasi (GMD)",
        symbolFormat: "GMD {#}",
    },
    GEL: {
        name: "Georgian Lari (GEL)",
        symbolFormat: "₾{#}",
    },
    GHC: {
        name: "Ghanian Cedi (GHC)",
        symbolFormat: "GH₵ {#}",
    },
    GIP: {
        name: "Gibraltar Pound (GIP)",
        symbolFormat: "&pound;{#}",
    },
    XAU: {
        name: "Gold Ounces (XAU)",
        symbolFormat: "XAU {#}",
    },
    GTQ: {
        name: "Guatemala Quetzal (GTQ)",
        symbolFormat: "{#} Q",
    },
    GGP: {
        name: "Guernsey Pound (GGP)",
        symbolFormat: "&pound;{#}",
    },
    GNF: {
        name: "Guinea Franc (GNF)",
        symbolFormat: "GNF {#}",
    },
    GYD: {
        name: "Guyana Dollar (GYD)",
        symbolFormat: "GY${#}",
    },
    HTG: {
        name: "Haiti Gourde (HTG)",
        symbolFormat: "HTG {#}",
    },
    HNL: {
        name: "Honduras Lempira (HNL)",
        symbolFormat: "HNL {#}",
    },
    HKD: {
        name: "Hong Kong Dollar (HKD)",
        symbolFormat: "HK${#}",
    },
    HUF: {
        name: "Hungarian Forint (HUF)",
        symbolFormat: "{#} Ft",
    },
    ISK: {
        name: "Iceland Krona (ISK)",
        symbolFormat: "{#} kr",
    },
    INR: {
        name: "Indian Rupee (INR)",
        symbolFormat: "₹{#}",
    },
    IDR: {
        name: "Indonesian Rupiah (IDR)",
        symbolFormat: "Rp {#}",
    },
    IRR: {
        name: "Iran Rial (IRR)",
        symbolFormat: "IRR {#}",
    },
    IQD: {
        name: "Iraqi Dinar (IQD)",
        symbolFormat: "IQD {#}",
    },
    IMP: {
        name: "Isle of Man Pound (IMP)",
        symbolFormat: "&pound;{#}",
    },
    ILS: {
        name: "Israeli Shekel (ILS)",
        symbolFormat: "₪{#}",
    },
    JMD: {
        name: "Jamaican Dollar (JMD)",
        symbolFormat: "JA${#}",
    },
    JPY: {
        name: "Japanese Yen (JPY)",
        symbolFormat: "&yen;{#}",
    },
    JEP: {
        name: "Jersey Pound (JEP)",
        symbolFormat: "&pound;{#}",
    },
    JOD: {
        name: "Jordanian Dinar (JOD)",
        symbolFormat: "JOD {#}",
    },
    KZT: {
        name: "Kazakhstan Tenge (KZT)",
        symbolFormat: "₸{#}",
    },
    KES: {
        name: "Kenyan Shilling (KES)",
        symbolFormat: "KSh {#}",
    },
    KRW: {
        name: "Korean Won (KRW)",
        symbolFormat: "₩{#}",
    },
    KWD: {
        name: "Kuwaiti Dinar (KWD)",
        symbolFormat: "{#} KD",
    },
    KGS: {
        name: "Kyrgyzstan Som (KGS)",
        symbolFormat: "KGS {#}",
    },
    LAK: {
        name: "Lao Kip (LAK)",
        symbolFormat: "₭{#}",
    },
    LBP: {
        name: "Lebanese Pound (LBP)",
        symbolFormat: "LBP {#}",
    },
    LSL: {
        name: "Lesotho Loti (LSL)",
        symbolFormat: "LSL {#}",
    },
    LRD: {
        name: "Liberian Dollar (LRD)",
        symbolFormat: "L${#}",
    },
    LYD: {
        name: "Libyan Dinar (LYD)",
        symbolFormat: "{#} LD",
    },
    MOP: {
        name: "Macau Pataca (MOP)",
        symbolFormat: "MOP${#}",
    },
    MKD: {
        name: "Macedonian Denar (MKD)",
        symbolFormat: "MKD {#}",
    },
    MGF: {
        name: "Malagasy Franc (MGF)",
        symbolFormat: "MGF {#}",
    },
    MWK: {
        name: "Malawi Kwacha (MWK)",
        symbolFormat: "MK {#}",
    },
    MYR: {
        name: "Malaysian Ringgit (MYR)",
        symbolFormat: "RM {#}",
    },
    MVR: {
        name: "Maldives Rufiyaa (MVR)",
        symbolFormat: "MVR {#}",
    },
    MRO: {
        name: "Mauritania Ougulya (MRO)",
        symbolFormat: "MRO {#}",
    },
    MUR: {
        name: "Mauritius Rupee (MUR)",
        symbolFormat: "Rs {#}",
    },
    MXN: {
        name: "Mexican Peso (MXN)",
        symbolFormat: "${#}",
    },
    MDL: {
        name: "Moldovan Leu (MDL)",
        symbolFormat: "MDL {#}",
    },
    MNT: {
        name: "Mongolian Tugrik (MNT)",
        symbolFormat: "MNT {#}",
    },
    MAD: {
        name: "Moroccan Dirham (MAD)",
        symbolFormat: "MAD {#}",
    },
    MZM: {
        name: "Mozambique Metical (MZM)",
        symbolFormat: "MZM {#}",
    },
    MMK: {
        name: "Myanmar Kyat (MMK)",
        symbolFormat: "K{#}",
    },
    NAD: {
        name: "Namibian Dollar (NAD)",
        symbolFormat: "N${#}",
    },
    NPR: {
        name: "Nepalese Rupee (NPR)",
        symbolFormat: "रू{#}",
    },
    ANG: {
        name: "Neth Antilles Guilder (ANG)",
        symbolFormat: "ƒ{#}",
    },
    NZD: {
        name: "New Zealand Dollar (NZD)",
        symbolFormat: "NZ${#}",
    },
    NIO: {
        name: "Nicaragua Cordoba (NIO)",
        symbolFormat: "C${#}",
    },
    NGN: {
        name: "Nigerian Naira (NGN)",
        symbolFormat: "₦{#}",
    },
    KPW: {
        name: "North Korean Won (KPW)",
        symbolFormat: "₩{#}",
    },
    NOK: {
        name: "Norwegian Krone (NOK)",
        symbolFormat: "{#} kr",
    },
    OMR: {
        name: "Omani Rial (OMR)",
        symbolFormat: "OMR {#}",
    },
    XPF: {
        name: "Pacific Franc (XPF)",
        symbolFormat: "₣{#}",
    },
    PKR: {
        name: "Pakistani Rupee (PKR)",
        symbolFormat: "Rs {#}",
    },
    XPD: {
        name: "Palladium Ounces (XPD)",
        symbolFormat: "XPD {#}",
    },
    PAB: {
        name: "Panama Balboa (PAB)",
        symbolFormat: "B/. {#}",
    },
    PGK: {
        name: "Papua New Guinea Kina (PGK)",
        symbolFormat: "K {#}",
    },
    PYG: {
        name: "Paraguayan Guarani (PYG)",
        symbolFormat: "₲{#}",
    },
    PEN: {
        name: "Peruvian Nuevo Sol (PEN)",
        symbolFormat: "S/{#}",
    },
    PHP: {
        name: "Philippine Peso (PHP)",
        symbolFormat: "₱{#}",
    },
    XPT: {
        name: "Platinum Ounces (XPT)",
        symbolFormat: "XPT {#}",
    },
    PLN: {
        name: "Polish Zloty (PLN)",
        symbolFormat: "{#}zł",
    },
    QAR: {
        name: "Qatar Rial (QAR)",
        symbolFormat: "QAR {#}",
    },
    ROL: {
        name: "Romanian Leu (ROL)",
        symbolFormat: "RON {#}",
    },
    RUB: {
        name: "Russian Rouble (RUB)",
        symbolFormat: "{#}₽",
    },
    RWF: {
        name: "Rwanda Franc (RWF)",
        symbolFormat: "FRw {#}",
    },
    WST: {
        name: "Samoa Tala (WST)",
        symbolFormat: "WS${#}",
    },
    STD: {
        name: "Sao Tome Dobra (STN)",
        symbolFormat: "STN {#}",
    },
    SAR: {
        name: "Saudi Arabian Riyal (SAR)",
        symbolFormat: "SAR {#}",
    },
    SCR: {
        name: "Seychelles Rupee (SCR)",
        symbolFormat: "SCR {#}",
    },
    SLL: {
        name: "Sierra Leone Leone (SLL)",
        symbolFormat: "SLL {#}",
    },
    XAG: {
        name: "Silver Ounces (XAG)",
        symbolFormat: "XAG {#}",
    },
    SGD: {
        name: "Singapore Dollar (SGD)",
        symbolFormat: "S${#}",
    },
    SBD: {
        name: "Solomon Islands Dollar (SBD)",
        symbolFormat: "SI${#}",
    },
    SOS: {
        name: "Somali Shilling (SOS)",
        symbolFormat: "SOS {#}",
    },
    ZAR: {
        name: "South African Rand (ZAR)",
        symbolFormat: "R{#}",
    },
    LKR: {
        name: "Sri Lanka Rupee (LKR)",
        symbolFormat: "Rs {#}",
    },
    SHP: {
        name: "St Helena Pound (SHP)",
        symbolFormat: "&pound;{#}",
    },
    SSP: {
        name: "Sudanese Pound (SSP)",
        symbolFormat: "SSP {#}",
    },
    SRD: {
        name: "Surinam Dollar (SRD)",
        symbolFormat: "Sr${#}",
    },
    SZL: {
        name: "Swaziland Lilageni (SZL)",
        symbolFormat: "E{#}",
    },
    SEK: {
        name: "Swedish Krona (SEK)",
        symbolFormat: "{#} kr",
    },
    CHF: {
        name: "Swiss Franc (CHF)",
        symbolFormat: "{#} Fr.",
    },
    SYP: {
        name: "Syrian Pound (SYP)",
        symbolFormat: "SYP {#}",
    },
    TWD: {
        name: "Taiwan Dollar (TWD)",
        symbolFormat: "NT${#}",
    },
    TZS: {
        name: "Tanzanian Shilling (TZS)",
        symbolFormat: "TZS {#}",
    },
    THB: {
        name: "Thai Baht (THB)",
        symbolFormat: "฿{#}",
    },
    TOP: {
        name: "Tonga Pa'anga (TOP)",
        symbolFormat: "T${#}",
    },
    TTD: {
        name: "Trinidad&Tobago Dollar (TTD)",
        symbolFormat: "TT${#}",
    },
    TND: {
        name: "Tunisian Dinar (TND)",
        symbolFormat: "TND {#}",
    },
    TRL: {
        name: "Turkish Lira (TRL)",
        symbolFormat: "₺{#}",
    },
    TMM: {
        name: "Turkmen Manat (TMM)",
        symbolFormat: "TMM {#}",
    },
    USD: {
        name: "U.S. Dollar (USD)",
        symbolFormat: "${#}",
    },
    AED: {
        name: "UAE Dirham (AED)",
        symbolFormat: "AED {#}",
    },
    UGX: {
        name: "Ugandan Shilling (UGX)",
        symbolFormat: "USh {#}",
    },
    UAH: {
        name: "Ukraine Hryvnia (UAH)",
        symbolFormat: "₴{#}",
    },
    UYU: {
        name: "Uruguayan New Peso (UYU)",
        symbolFormat: "${#}",
    },
    UZS: {
        name: "Uzbekistani Sum (UZS)",
        symbolFormat: "{#} soʻm",
    },
    VUV: {
        name: "Vanuatu Vatu (VUV)",
        symbolFormat: "{#}VT",
    },
    VEB: {
        name: "Venezuelan Bolivar (VEB)",
        symbolFormat: "{#} Bs.",
    },
    VND: {
        name: "Vietnam Dong (VND)",
        symbolFormat: "{#}₫",
    },
    YER: {
        name: "Yemen Riyal (YER)",
        symbolFormat: "YER {#}",
    },
    YUM: {
        name: "Yugoslav Dinar (YUM)",
        symbolFormat: "YUM {#}",
    },
    ZRN: {
        name: "Zaire New Zaire (ZRN)",
        symbolFormat: "ZRN {#}",
    },
    ZMK: {
        name: "Zambian Kwacha (ZMK)",
        symbolFormat: "ZMK {#}",
    },
    ZWD: {
        name: "Zimbabwe Dollar (ZWD)",
        symbolFormat: "Z${#}",
    },
};

export function getCurrencyCodeByCountryCode(code: string): string {
    let result = "USD";

    for (let country of Object.values(currencyMap)) {
        if (country["abbreviation"] === code) {
            result = country["currency"];
            break;
        }
    }

    return result;
}
