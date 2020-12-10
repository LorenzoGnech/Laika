exports.isAstronautCorrect = function (astronaut)
{
    if ( 
        typeof astronaut.birth !== typeof Date ||
        typeof astronaut.name !== typeof String ||
        typeof astronaut.nationality !== typeof String ||
        !Array.isArray(astronaut.img_path) ||
        typeof astronaut.agency !== typeof String ||
        !Array.isArray(astronaut.tags)
    )
    { return false; }

    return true;
}

exports.isExoplanetCorrect = function (exoplanet)
{
    if ( 
        typeof exoplanet.discover_date !== typeof Date ||
        typeof exoplanet.name !== typeof String ||
        typeof exoplanet.description !== typeof String ||
        typeof exoplanet.img_path !== typeof String ||
        typeof exoplanet.source_url !== typeof String ||
        !Array.isArray(exoplanet.tags)
    )
    { return false; }

    return true;
}

exports.isMissionCorrect = function (mission)
{
    if ( 
        typeof mission.date !== typeof Date ||
        typeof mission.title !== typeof String ||
        typeof mission.description !== typeof String ||
        !Array.isArray(mission.img_path) ||
        typeof mission.source_url !== typeof String ||
        !Array.isArray(mission.tags)
    )
    { return false; }

    return true;
}

// Non effettua controlli sulla data poiché è decisa dal server e non dal client.
exports.isNewsCorrect = function (news)
{
    if ( 
        typeof news.title !== typeof String ||
        typeof news.content !== typeof String ||
        typeof news.img_path !== typeof String ||
        typeof news.source_url !== typeof String ||
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
        typeof telescope.launch_date !== 'string' ||
        !Array.isArray(telescope.img_path) ||
        typeof telescope.source_url !== 'string' ||
        !Array.isArray(telescope.tags)
    )
    { return false; }

    return true;
}