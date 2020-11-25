const express = require('express');
const router = express.Router();

var newslist = [{
    "id": 1,
    "date": "17/11/2020",
    "title": "NASA’s SpaceX Crew-1 Astronauts Arrive at Space Station",
    "content": `
    The SpaceX Crew Dragon Resilience successfully docked to the International Space Station at 11:01 p.m. EST Monday, transporting NASA astronauts Michael Hopkins, Victor Glover, Shannon Walker, and Japan Aerospace Exploration Agency (JAXA) astronaut Soichi Noguchi.

    When the hatches open about 1:10 a.m. Tuesday, Nov. 17, the Crew-1 astronauts will join Expedition 64 Flight Engineer Kate Rubins of NASA, and station Commander Sergey Ryzhikov and Flight Engineer Sergey Kud-Sverchkov of Roscosmos, who arrived to the station Oct. 14.
    
    NASA TV will continue to provide live coverage through the welcoming ceremony with NASA’s Associate Administrator for Human Exploration and Operations Kathy Lueders joining to greet the crew from the Mission Control Center at NASA’s Johnson Space Center in Houston, and JAXA President Hiroshi Yamakawa joining from the Tsukuba Space Center in Japan. The welcome ceremony is targeted to begin about 1:40 a.m.
    
    About 2 a.m., NASA will host a news conference following the welcome ceremony with the following participants:
    
    Kathy Lueders, associate administrator for human exploration and operations, NASA Headquarters
    Johnson Center Director Mark Geyer
    Ven Feng, deputy manager, NASA’s Commercial Crew Program
    Joel Montalbano, program manager, International Space Station
    All media participation will be remote; no media will be accommodated at any NASA site due to the COVID-19 pandemic. Media may ask questions by phone in the post-docking news conference Nov. 17 by calling the Johnson newsroom at 281-483-5111 no later than 1:50 a.m.
    
    On Thursday, Nov. 19, the four astronauts who are beginning the first crew rotation mission on the space station will join Rubins to answer questions in a news conference from the space station that will air live at 9:55 a.m. on NASA Television and the agency’s website.
    
    The crew will discuss its upcoming expedition, which increases the regular space station crew size from six to seven astronauts – adding to the crew time available for research – as well as their launch, rendezvous, and docking.
    
    NASA’s SpaceX Crew-1 mission lifted off Sunday, Nov. 15, at 7:27 p.m. on the SpaceX Falcon 9 rocket and Crew Dragon spacecraft from Launch Complex 39A at NASA’s Kennedy Space Center in Florida. The mission is the first of six certified, crew missions NASA and SpaceX will fly as a part of the agency’s Commercial Crew Program.
    `,
    "img": "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/50182565011-06de5c65e1-k-1596721917.jpg",
    "source": "https://www.nasa.gov/",
    "tags": ["nasa", "spacex", "iss"] 
}, {
    "id": 2,
    "date": "21/11/2020",
    "title": "NASA, US and European Partners Launch Mission to Monitor Global Ocean",
    "content": `A joint U.S.-European satellite built to monitor global sea levels lifted off on a SpaceX Falcon 9 rocket from Space Launch Complex 4E at Vandenberg Air Force Base in California Saturday at 9:17 a.m. PST (12:17 p.m. EST).

    About the size of a small pickup truck, Sentinel-6 Michael Freilich will extend a nearly 30-year continuous dataset on sea level collected by an ongoing collaboration of U.S. and European satellites while enhancing weather forecasts and providing detailed information on large-scale ocean currents to support ship navigation near coastlines.
    
    "The Earth is changing, and this satellite will help deepen our understanding of how," said Karen St. Germain, director of NASA's Earth Science Division. "The changing Earth processes are affecting sea level globally, but the impact on local communities varies widely. International collaboration is critical to both understanding these changes and informing coastal communities around the world."
    After arriving in orbit, the spacecraft separated from the rocket's second stage and unfolded its twin sets of solar arrays. Ground controllers successfully acquired the satellite's signal, and initial telemetry reports showed the spacecraft in good health. Sentinel-6 Michael Freilich will now undergo a series of exhaustive checks and calibrations before it starts collecting science data in a few months' time.

Continuing the Legacy

The spacecraft is named in honor of Michael Freilich, the former director of NASA's Earth Science Division, who was a leading figure in advancing ocean observations from space. Freilich passed away Aug. 5, 2020. His close family and friends attended the launch of the satellite that now carries his name.

"Michael was a tireless force in Earth sciences. Climate change and sea level rise know no national borders, and he championed international collaboration to confront the challenge," said ESA (European Space Agency) Director of Earth Observation Programmes Josef Aschbacher. "It's fitting that a satellite in his name will continue the 'gold standard' of sea level measurements for the next half-decade. This European-U.S. cooperation is exemplary and will pave the way for more cooperation opportunities in Earth observation."

"Mike helped ensure NASA was a steadfast partner with scientists and space agencies worldwide, and his love of oceanography and Earth science helped us improve understanding of our beautiful planet," added Thomas Zurbuchen, NASA associate administrator for science at the agency's headquarters. "This satellite so graciously named for him by our European partners will carry out the critical work Mike so believed in – adding to a legacy of crucial data about our oceans and paying it forward for the benefit of future generations."

Sentinel-6 Michael Freilich will continue the sea level record that began in 1992 with the TOPEX/Poseidon satellite and continued with Jason-1 (2001), OSTM/Jason-2 (2008), and eventually Jason-3, which has been observing the oceans since 2016. Together, these satellites have provided a nearly 30-year record of precise measurements of sea level height while tracking the rate at which our oceans are rising in response to our warming climate. Sentinel-6 Michael Freilich will pass the baton to its twin, Sentinel-6B, in 2025, extending the current climate record at least another 10 years between the two satellites.

Global Science Impact

This latest mission marks the first international involvement in Copernicus, the European Union's Earth Observation Programme. Along with measuring sea levels for almost the entire globe, Sentinel-6 Michael Freilich's suite of scientific instruments will also make atmospheric measurements that can be used to complement climate models and help meteorologists make better weather forecasts.

"NASA is but one of several partners involved in Sentinel-6 Michael Freilich, but this satellite speaks to the very core of our mission," said NASA Administrator Jim Bridenstine. "Whether 800 miles above Earth with this remarkable spacecraft or traveling to Mars to look for signs of life, whether providing farmers with agricultural data or aiding first responders with our Disasters program, we are tirelessly committed not just to learning and exploring, but to having an impact where it's needed."

The initial orbit of Sentinel-6 Michael Freilich is about 12.5 miles (20.1 kilometers) lower than its ultimate operational orbit of 830 miles (1,336 kilometers). In less than a month, the satellite will receive commands to raise its orbit, trailing Jason-3 by about 30 seconds. Mission scientists and engineers will then spend about a year cross-calibrating data collected by the two satellites to ensure the continuity of sea level measurements from one satellite to the next. Sentinel-6 Michael Freilich will then take over as the primary sea level satellite and Jason-3 will provide a supporting role until the end of its mission.

"This mission is the very essence of partnership, precision, and incredible long-term focus," said Michael Watkins, director of NASA's Jet Propulsion Laboratory in Southern California, which manages the mission. "Sentinel-6 Michael Freilich not only provides a critical measurement, it is essential for continuing this historic multi-decadal sea level record."

Sentinel-6 Michael Freilich and Sentinel-6B compose the Sentinel-6/Jason-CS (Continuity of Service) mission developed in partnership with ESA. ESA is developing the new Sentinel family of missions to support the operational needs of the Copernicus program, managed by the European Commission. Other partners include the European Organisation for the Exploitation of Meteorological Satellites (EUMETSAT), and National Oceanic and Atmospheric Administration, with funding support from the European Commission and technical support from France's National Centre for Space Studies.

"The data from this satellite, which is so critical for climate monitoring and weather forecasting, will be of unprecedented accuracy," said EUMETSAT Director-General Alain Ratier. "These data, which can only be obtained by measurements from space, will bring a wide range of benefits to people around the globe, from safer ocean travel to more precise prediction of hurricane paths, from greater understanding of sea level rise to more accurate seasonal weather forecasts, and so much more."

JPL, a division of Caltech in Pasadena, California, is contributing three science instruments to each Sentinel-6 satellite: the Advanced Microwave Radiometer for Climate, the Global Navigation Satellite System – Radio Occultation, and the Laser Retroreflector Array. NASA is also contributing launch services, ground systems supporting operation of the NASA science instruments, the science data processors for two of these instruments, and support for the U.S. component of the international Ocean Surface Topography Science Team. The launch is managed by NASA’s Launch Services Program, based at the agency’s Kennedy Space Center in Florida.`,
    "img": "https://www.nasa.gov/sites/default/files/thumbnails/image/screen_shot_2020-11-21_at_12.17.43_pm_0.png",
    "source": "https://www.nasa.gov",
    "tags": ["nasa", "spacex", "esa"]
}, {
    "id": 3,
    "date": "21/11/2020",
    "title": "Copernicus Sentinel-6 lifts off",
    "content": `The Copernicus Sentinel-6 Michael Freilich satellite lifts off on a Falcon 9 rocket from the Space Launch Complex 4 East at the Vandenberg Air Force Base, California, US. Copernicus Sentinel-6 Michael Freilich is the first of two identical satellites to provide critical measurements of sea-level change. This latest Copernicus satellite will continue the long-term record of reference measurements, extending the record of sea-level height into a fourth decade. Mapping 95% of Earth’s ice-free ocean every 10 days, it will also provide crucial operational data for ocean forecasting.

    The Copernicus Sentinel-6 mission is a true example of international cooperation. While Sentinel-6 is one of the European Union’s family of Copernicus missions, its implementation is the result of the unique collaboration between ESA, NASA, Eumetsat and NOAA, with contribution from the French space agency CNES.`,
    "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Copernicus_Sentinel-6_in_orbit_ESA21459422.jpeg/1200px-Copernicus_Sentinel-6_in_orbit_ESA21459422.jpeg",
    "source": "https://www.esa.int",
    "tags": ["esa"]
}, {
    "id": 4,
    "date": "21/11/2020",
    "title": "SENTINEL-6 Michael Freilich mission",
    "content": `On Saturday, November 21 at 9:17 a.m. PST, SpaceX launched the Sentinel-6 Michael Freilich mission from Space Launch Complex 4E (SLC-4E) at Vandenberg Air Force Base in California.

    Following stage separation, Falcon 9’s first stage returned to Earth and landed on Landing Zone 4 at Vandenberg Air Force Base. The spacecraft deployed approximately 58 minutes after liftoff.`,
    "img": "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/izXqxY8NPA38/v2/1000x-1.jpg",
    "source": "https://www.spacex.com",
    "tags": ["spacex"]
}, {
    "id": 5,
    "date": "24/11/2020",
    "title": "NASA TV Coverage Set for Next Space Station Resupply Mission with SpaceX",
    "content": `NASA commercial cargo provider SpaceX is targeting 11:39 a.m. EST Saturday, Dec. 5, for the launch of its 21st commercial resupply services (CRS-21) mission to the International Space Station from Launch Complex 39A at the agency’s Kennedy Space Center in Florida. CRS-21 will deliver science investigations, supplies, and equipment for NASA and is the first mission under the company’s second Commercial Resupply Services contract with NASA. Live coverage will air on NASA Television and the agency’s website, with prelaunch events Friday, Dec. 4, and Saturday, Dec. 5.

    The upgraded Dragon spacecraft will be filled with supplies and payloads, including critical materials to directly support dozens of the more than 250 science and research investigations that will occur during Expeditions 64 and 65. In addition to bringing research to the station, the Dragon’s unpressurized trunk will transport the Nanoracks Bishop Airlock. The first commercially funded space station airlock, the Bishop Airlock is an airtight segment used for transfer of payloads between the inside and outside of the station. It provides payload hosting, robotics testing, and satellite deployment while also serving as an outside toolbox for astronauts conducting spacewalks.
    
    About 12 minutes after launch, Dragon will separate from the Falcon 9 rocket’s second stage and begin a carefully choreographed series of thruster firings to reach the space station. Arrival to the space station is planned for Sunday, Dec. 6. Dragon will autonomously dock to the station’s Harmony module with Expedition 64 Flight Engineers Kate Rubins and Victor Glover of NASA monitoring operations.
    
    The Dragon spacecraft will spend about one month attached to the space station before it returns to Earth with research and return cargo, with splashdown in the Atlantic Ocean.  `,
    "img": "https://www.nasa.gov/sites/default/files/styles/full_width/public/thumbnails/image/ksc-20200306-ph-awg07_0007_medium.jpg?itok=2Q-n-sUT",
    "source": "https://www.nasa.gov",
    "tags": ["nasa", "spacex", "iss"]
}];

router.get('', async (req, res) => {
    res.status(200).json(newslist);
});

router.get('/:id', async (req, res) => {
    var id = req.params.id;
    var news = newslist.find( (p) => p.id == id );
    if (news !== undefined){
        res.status(200).send(news);
    } else {
        res.status(404).send('Not found');
    }
});

router.get('/latest/:size', async (req, res) => {
    var size = req.params.size;
    if (size < newslist.length){
        res.status(200).send(newslist.slice(newslist.length-size, size+1));
    } else {
        res.status(200).send(newslist);
    }
});

router.post('', async (req, res) => {
    
    var newnews = {
        "id": (newslist.length + 1),
        "date": req.body.date,
        "title": req.body.title,
        "content": req.body.content,
        "img": req.body.img,
        "source": req.body.source,
        "tags": req.body.tags
    }

    newslist.push(newnews)

    console.log('News saved successfully');
    res.location("/api/v1/news/").status(201).send('News saved successfully');
});

router.delete('/:id', async (req, res) => {
    var id = req.params.id;
    var index = newslist.findIndex(p => p.id == id);
    if (index !== undefined && index >= 0){
        newslist.splice(index, 1)
        res.status(200).send('News deleted');
    } else {
        res.status(404).send('Not found');
    }
});

router.put('/:id', async (req, res) => {
    var id = req.params.id;
    var index = newslist.findIndex(p => p.id == id);
    if(index !== undefined && index >= 0){
        newslist[index].date = req.body.date;
        newslist[index].title = req.body.title;
        newslist[index].content = req.body.content;
        newslist[index].img = req.body.img;
        newslist[index].source = req.body.source;
        newslist[index].tags = req.body.tags;
        res.status(200).send('News updated');
    } else {
        res.status(404).send('Not found');
    }
});

module.exports = router;