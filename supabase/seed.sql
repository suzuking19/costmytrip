-- Initial seed data for development environment
-- This file contains initial data that can be safely loaded during development

-- Insert categories (expense categories)
INSERT INTO categories (name) VALUES
('accommodation'),
('transportation'),
('food'),
('shopping'),
('entertainment'),
('sightseeing'),
('activities'),
('miscellaneous');

-- Insert travel types
INSERT INTO travel_types (name) VALUES
('solo'),
('couple'),
('family'),
('friends'),
('business'),
('group tour'),
('backpacking'),
('luxury');

-- Insert positions (occupations)
INSERT INTO positions (name) VALUES
('student'),
('office worker'),
('freelancer'),
('entrepreneur'),
('teacher'),
('engineer'),
('designer'),
('consultant'),
('researcher'),
('artist'),
('writer'),
('photographer'),
('retired'),
('other');

-- Insert expense card statuses
INSERT INTO expense_card_statuses (name) VALUES
('public'),
('editing');

-- Insert cities data
INSERT INTO cities (name, country, pin_count) VALUES
('tokyo', 'japan', 0),
('osaka', 'japan', 0),
('kyoto', 'japan', 0),
('sapporo', 'japan', 0),
('fukuoka', 'japan', 0),
('okinawa', 'japan', 0),
('nagoya', 'japan', 0),
('hiroshima', 'japan', 0),
('sendai', 'japan', 0),
('yokohama', 'japan', 0),
('kobe', 'japan', 0),
('kanazawa', 'japan', 0),
('hakodate', 'japan', 0),
('nara', 'japan', 0),
('karuizawa', 'japan', 0),
('chiba', 'japan', 0),
('saitama', 'japan', 0),
('shizuoka', 'japan', 0),
('niigata', 'japan', 0),
('kumamoto', 'japan', 0),
('kagoshima', 'japan', 0),
('matsuyama', 'japan', 0),
('takayama', 'japan', 0),
('ishigaki', 'japan', 0),
('beppu', 'japan', 0),

('seoul', 'south korea', 0),
('busan', 'south korea', 0),
('jeju', 'south korea', 0),
('incheon', 'south korea', 0),
('gwangju', 'south korea', 0),
('daejeon', 'south korea', 0),
('daegu', 'south korea', 0),
('taipei', 'taiwan', 0),
('kaohsiung', 'taiwan', 0),
('taichung', 'taiwan', 0),
('tainan', 'taiwan', 0),
('hualien', 'taiwan', 0),
('bangkok', 'thailand', 0),
('chiang mai', 'thailand', 0),
('phuket', 'thailand', 0),
('pattaya', 'thailand', 0),
('koh samui', 'thailand', 0),
('singapore', 'singapore', 0),
('hong kong', null, 0),
('macau', null, 0),
('shanghai', 'china', 0),
('beijing', 'china', 0),
('guangzhou', 'china', 0),
('chengdu', 'china', 0),
('chongqing', 'china', 0),
('xian', 'china', 0),
('hangzhou', 'china', 0),
('shenzhen', 'china', 0),
('qingdao', 'china', 0),
('nanjing', 'china', 0),
('ho chi minh city', 'vietnam', 0),
('hanoi', 'vietnam', 0),
('da nang', 'vietnam', 0),
('hoi an', 'vietnam', 0),
('hue', 'vietnam', 0),
('phu quoc', 'vietnam', 0),
('kuala lumpur', 'malaysia', 0),
('penang', 'malaysia', 0),
('kota kinabalu', 'malaysia', 0),
('langkawi', 'malaysia', 0),
('bali', 'indonesia', 0),
('jakarta', 'indonesia', 0),
('yogyakarta', 'indonesia', 0),
('bandung', 'indonesia', 0),
('surabaya', 'indonesia', 0),
('dubai', 'united arab emirates', 0),
('abu dhabi', 'united arab emirates', 0),
('doha', 'qatar', 0),
('riyadh', 'saudi arabia', 0),
('jeddah', 'saudi arabia', 0),
('muscat', 'oman', 0),
('manama', 'bahrain', 0),
('kuwait city', 'kuwait', 0),
('delhi', 'india', 0),
('mumbai', 'india', 0),
('bangalore', 'india', 0),
('chennai', 'india', 0),
('kolkata', 'india', 0),
('jaipur', 'india', 0),
('agra', 'india', 0),
('goa', 'india', 0),
('siem reap', 'cambodia', 0),
('phnom penh', 'cambodia', 0),
('colombo', 'sri lanka', 0),
('malé', 'maldives', 0),
('kathmandu', 'nepal', 0),
('thimphu', 'bhutan', 0),
('dhaka', 'bangladesh', 0),
('yangon', 'myanmar', 0),
('vientiane', 'laos', 0),
('ulaanbaatar', 'mongolia', 0),
('baku', 'azerbaijan', 0),
('tbilisi', 'georgia', 0),
('yerevan', 'armenia', 0),
('nur-sultan', 'kazakhstan', 0),
('tashkent', 'uzbekistan', 0),

('paris', 'france', 0),
('nice', 'france', 0),
('marseille', 'france', 0),
('lyon', 'france', 0),
('bordeaux', 'france', 0),
('strasbourg', 'france', 0),
('cannes', 'france', 0),
('rome', 'italy', 0),
('florence', 'italy', 0),
('venice', 'italy', 0),
('milan', 'italy', 0),
('naples', 'italy', 0),
('bologna', 'italy', 0),
('turin', 'italy', 0),
('london', 'united kingdom', 0),
('edinburgh', 'united kingdom', 0),
('manchester', 'united kingdom', 0),
('liverpool', 'united kingdom', 0),
('dublin', 'ireland', 0),
('galway', 'ireland', 0),
('barcelona', 'spain', 0),
('madrid', 'spain', 0),
('seville', 'spain', 0),
('valencia', 'spain', 0),
('granada', 'spain', 0),
('malaga', 'spain', 0),
('palma de mallorca', 'spain', 0),
('amsterdam', 'netherlands', 0),
('rotterdam', 'netherlands', 0),
('utrecht', 'netherlands', 0),
('berlin', 'germany', 0),
('munich', 'germany', 0),
('frankfurt', 'germany', 0),
('hamburg', 'germany', 0),
('cologne', 'germany', 0),
('dusseldorf', 'germany', 0),
('prague', 'czech republic', 0),
('brno', 'czech republic', 0),
('krakow', 'poland', 0),
('warsaw', 'poland', 0),
('wroclaw', 'poland', 0),
('vienna', 'austria', 0),
('salzburg', 'austria', 0),
('budapest', 'hungary', 0),
('lisbon', 'portugal', 0),
('porto', 'portugal', 0),
('zagreb', 'croatia', 0),
('dubrovnik', 'croatia', 0),
('split', 'croatia', 0),
('ljubljana', 'slovenia', 0),
('belgrade', 'serbia', 0),
('sarajevo', 'bosnia and herzegovina', 0),
('skopje', 'north macedonia', 0),
('tirana', 'albania', 0),
('sofia', 'bulgaria', 0),
('bucharest', 'romania', 0),
('kiev', 'ukraine', 0),
('odessa', 'ukraine', 0),
('moscow', 'russia', 0),
('saint petersburg', 'russia', 0),
('helsinki', 'finland', 0),
('stockholm', 'sweden', 0),
('gothenburg', 'sweden', 0),
('copenhagen', 'denmark', 0),
('oslo', 'norway', 0),
('bergen', 'norway', 0),
('reykjavik', 'iceland', 0),
('athens', 'greece', 0),
('santorini', 'greece', 0),
('mykonos', 'greece', 0),
('thessaloniki', 'greece', 0),
('istanbul', 'turkey', 0),
('ankara', 'turkey', 0),
('izmir', 'turkey', 0),
('cappadocia', 'turkey', 0),
('zurich', 'switzerland', 0),
('geneva', 'switzerland', 0),
('bern', 'switzerland', 0),
('lucerne', 'switzerland', 0),
('brussels', 'belgium', 0),
('bruges', 'belgium', 0),
('antwerp', 'belgium', 0),
('luxembourg city', 'luxembourg', 0),
('monaco', 'monaco', 0),
('vatican city', 'vatican city', 0),
('valletta', 'malta', 0),
('nicosia', 'cyprus', 0),
('tallinn', 'estonia', 0),
('riga', 'latvia', 0),
('vilnius', 'lithuania', 0),
('minsk', 'belarus', 0),
('chișinău', 'moldova', 0),
('podgorica', 'montenegro', 0),
('prishtina', 'kosovo', 0),
('sydney', 'australia', 0),
('melbourne', 'australia', 0),
('brisbane', 'australia', 0),
('perth', 'australia', 0),
('adelaide', 'australia', 0),
('gold coast', 'australia', 0),
('cairns', 'australia', 0),
('hobart', 'australia', 0),
('canberra', 'australia', 0),
('auckland', 'new zealand', 0),
('queenstown', 'new zealand', 0),
('wellington', 'new zealand', 0),
('christchurch', 'new zealand', 0),
('suva', 'fiji', 0),
('papeete', 'french polynesia', 0),
('apia', 'samoa', 0),
('port vila', 'vanuatu', 0),
('nadi', 'fiji', 0),

('new york', 'united states', 0),
('los angeles', 'united states', 0),
('san francisco', 'united states', 0),
('las vegas', 'united states', 0),
('miami', 'united states', 0),
('orlando', 'united states', 0),
('chicago', 'united states', 0),
('boston', 'united states', 0),
('seattle', 'united states', 0),
('honolulu', 'united states', 0),
('washington d.c.', 'united states', 0),
('houston', 'united states', 0),
('dallas', 'united states', 0),
('philadelphia', 'united states', 0),
('atlanta', 'united states', 0),
('denver', 'united states', 0),
('phoenix', 'united states', 0),
('san diego', 'united states', 0),
('new orleans', 'united states', 0),
('nashville', 'united states', 0),
('charleston', 'united states', 0),
('salt lake city', 'united states', 0),
('portland', 'united states', 0),
('san antonio', 'united states', 0),
('austin', 'united states', 0),
('columbus', 'united states', 0),
('indianapolis', 'united states', 0),
('detroit', 'united states', 0),
('st. louis', 'united states', 0),
('minneapolis', 'united states', 0),
('baltimore', 'united states', 0),
('vancouver', 'canada', 0),
('toronto', 'canada', 0),
('montreal', 'canada', 0),
('calgary', 'canada', 0),
('quebec city', 'canada', 0),
('ottawa', 'canada', 0),
('halifax', 'canada', 0),
('mexico city', 'mexico', 0),
('cancun', 'mexico', 0),
('puerto vallarta', 'mexico', 0),
('guadalajara', 'mexico', 0),
('riviera maya', 'mexico', 0),
('havana', 'cuba', 0),
('santo domingo', 'dominican republic', 0),
('san juan', 'puerto rico', 0),
('kingston', 'jamaica', 0),
('nassau', 'bahamas', 0),
('st. barth', 'france', 0),
('castries', 'saint lucia', 0),
('bridgetown', 'barbados', 0),
('port of spain', 'trinidad and tobago', 0),
('panama city', 'panama', 0),
('san jose', 'costa rica', 0),
('belize city', 'belize', 0),
('guatemala city', 'guatemala', 0),
('san salvador', 'el salvador', 0),
('tegucigalpa', 'honduras', 0),
('managua', 'nicaragua', 0),
('bogota', 'colombia', 0),
('cartagena', 'colombia', 0),
('medellin', 'colombia', 0),
('lima', 'peru', 0),
('cusco', 'peru', 0),
('machu picchu', 'peru', 0),
('quito', 'ecuador', 0),
('galapagos islands', 'ecuador', 0),
('santiago', 'chile', 0),
('rio de janeiro', 'brazil', 0),
('sao paulo', 'brazil', 0),
('brasilia', 'brazil', 0),
('buenos aires', 'argentina', 0),
('bariloche', 'argentina', 0),
('montevideo', 'uruguay', 0),
('asuncion', 'paraguay', 0),
('la paz', 'bolivia', 0),

('cairo', 'egypt', 0),
('luxor', 'egypt', 0),
('sharm el sheikh', 'egypt', 0),
('marrakech', 'morocco', 0),
('casablanca', 'morocco', 0),
('fes', 'morocco', 0),
('cape town', 'south africa', 0),
('johannesburg', 'south africa', 0),
('nairobi', 'kenya', 0),
('dar es salaam', 'tanzania', 0),
('zanzibar', 'tanzania', 0),
('addis ababa', 'ethiopia', 0),
('lagos', 'nigeria', 0),
('accra', 'ghana', 0),
('dakar', 'senegal', 0),
('tunis', 'tunisia', 0),
('algiers', 'algeria', 0),
('tripoli', 'libya', 0),
('khartoum', 'sudan', 0),
('luanda', 'angola', 0),
('harare', 'zimbabwe', 0),
('victoria falls', 'zimbabwe', 0),
('seychelles', 'seychelles', 0),
('mauritius', 'mauritius', 0),
('reunion', 'france', 0),
('gaborone', 'botswana', 0),
('windhoek', 'namibia', 0),
('antananarivo', 'madagascar', 0),

('el aaiún', null, 0),
('jerusalem', null, 0),
('sevastopol', null, 0),
('simferopol', null, 0),
('tskaltubo', 'georgia', 0),
('sukhumi', null, 0),
('tskhinvali', null, 0),
('north nicosia', null, 0),
('ramallah', 'palestine', 0),
('gaza city', 'palestine', 0);
