exports.isAstronautCorrect = function (astronaut)
{
    const {
        birth, name, nationality, img_path, agency, tags
    } = astronaut;

    if ( 
        typeof birth !== 'string' ||
        typeof name !== 'string' ||
        typeof nationality !== 'string' ||
        (!Array.isArray(img_path) && img_path.some(el => typeof el !== 'string')) ||
        typeof agency !== 'string' ||
        (!Array.isArray(tags) && tags.some(el => typeof el !== 'string'))
    )
    { return false; }

    return true;
}

exports.isExoplanetCorrect = function (exoplanet)
{
    const {
        discover_date, name, description, img_path, source_url, tags
    } = exoplanet;

    if ( 
        typeof discover_date !== 'string' ||
        typeof name !== 'string' ||
        typeof description !== 'string' ||
        typeof img_path !== 'string' ||
        typeof source_url !== 'string' ||
        (!Array.isArray(tags) && tags.some(el => typeof el !== 'string'))
    )
    { return false; }

    return true;
}

exports.isMissionCorrect = function (mission)
{
    const {
        date, title, description, img_path, source_url, tags
    } = mission;

    if ( 
        typeof date !== 'string' ||
        typeof title !== 'string' ||
        typeof description !== 'string' ||
        typeof img_path !== 'string' ||
        typeof source_url !== 'string' ||
        (!Array.isArray(tags) && tags.some(el => typeof el !== 'string'))
    )
    { return false; }

    return true;
}

// Non effettua controlli sulla data poiché è decisa dal server e non dal client.
exports.isNewsCorrect = function (news)
{
    const {
        date, title, content, img_path, source_url, tags
    } = news;

    if ( 
        typeof title !== 'string' ||
        typeof content !== 'string' ||
        typeof img_path !== 'string' ||
        typeof source_url !== 'string' ||
        (!Array.isArray(tags) && tags.some(el => typeof el !== 'string'))
    )
    { return false; }

    return true;
}

exports.isTelescopeCorrect = function (telescope)
{
    const {
        launch_date, name, description, img_path, source_url, tags
    } = telescope;

    if ( 
        typeof description !==  'string' ||
        typeof name !==  'string' ||
        typeof launch_date !==  'string' ||
        (!Array.isArray(img_path) && img_path.some(el => typeof el !== 'string')) ||
        typeof source_url !== 'string' ||
        (!Array.isArray(tags) && tags.some(el => typeof el !== 'string'))
    )
    { return false; }

    return true;
}

exports.isUserCorrect = function (user)
{
    const {
        email, password
    } = user;

    if ( 
        typeof email !== 'string' ||
        typeof password !== 'string'
    )
    { return false; }

    return true;
}