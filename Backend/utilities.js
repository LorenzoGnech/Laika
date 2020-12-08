
// Quick implementation, I believe mongodb should have a tool to check
// if an object conforms with its model...
exports.isAstronautCorrect = function isAstronautCorrect(astronaut)
{
    // To check how many properties it has.
    if (Object.keys(astronaut).length != 6) return false;

    if ( 
        typeof astronaut.id === 'undefined' ||
        typeof astronaut.birth === 'undefined' ||
        typeof astronaut.name === 'undefined' ||
        typeof astronaut.nationality === 'undefined' ||
        typeof astronaut.img === 'undefined' ||
        typeof astronaut.agency === 'undefined'
    )
    { return false; }

    return true;
}