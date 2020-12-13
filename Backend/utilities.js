exports.isAstronautCorrect = function (astronaut)
{
    if ( 
        typeof astronaut.birth !== 'string' ||
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
        typeof exoplanet.discover_date !== 'string' ||
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
        typeof mission.date !== 'string' ||
        typeof mission.title !== 'string' ||
        typeof mission.description !== 'string' ||
        typeof mission.img_path !== 'string' ||
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
        typeof news.date !== 'string' ||
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
        typeof telescope.launch_date !==  'string' ||
        !Array.isArray(telescope.img_path) ||
        typeof telescope.source_url !== 'string' ||
        !Array.isArray(telescope.tags)
    )
    { return false; }

    return true;
}

exports.isUserCorrect = function (user)
{
    if ( 
        typeof user.email !== 'string' ||
        typeof user.password !== 'string'
    )
    { return false; }

    return true;
}