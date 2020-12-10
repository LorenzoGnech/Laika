exports.isAstronautCorrect = function (astronaut)
{
    if ( 
        //!(astronaut.date instanceof Date) ||
        typeof astronaut.name !== 'string' ||
        typeof astronaut.nationality !== 'string' ||
        !Array.isArray(astronaut.img_path) ||
        typeof astronaut.agency !== 'string' ||
        !Array.isArray(astronaut.tags)
    )
    { return false; }

    return true;
}

exports.isExoplanetCorrect = function (exoplanet)
{
    if ( 
        //!(exoplanet.date instanceof Date) ||
        typeof exoplanet.name !== 'string' ||
        typeof exoplanet.description !== 'string' ||
        typeof exoplanet.img_path !== 'string' ||
        typeof exoplanet.source_url !== 'string' ||
        !Array.isArray(exoplanet.tags)
    )
    { return false; }

    return true;
}

exports.isMissionCorrect = function (mission)
{
    if ( 
        //!(mission.date instanceof Date) ||
        typeof mission.title !== 'string' ||
        typeof mission.description !== 'string' ||
        !Array.isArray(mission.img_path) ||
        typeof mission.source_url !== 'string' ||
        !Array.isArray(mission.tags)
    )
    { return false; }

    return true;
}

// Non effettua controlli sulla data poiché è decisa dal server e non dal client.
exports.isNewsCorrect = function (news)
{
    if ( 
        typeof news.title !== 'string' ||
        //!(news.date instanceof Date) ||
        typeof news.content !== 'string' ||
        typeof news.img_path !== 'string' ||
        typeof news.source_url !== 'string' ||
        !Array.isArray(news.tags)
    )
    { return false; }

    return true;
}

exports.isTelescopeCorrect = function (telescope)
{
    if ( 
        typeof telescope.description !==  'string' ||
        typeof telescope.name !==  'string' ||
        //!(telescope.launch_date instanceof Date) ||
        !Array.isArray(telescope.img_path) ||
        typeof telescope.source_url !== 'string' ||
        !Array.isArray(telescope.tags)
    )
    { return false; }

    return true;
}