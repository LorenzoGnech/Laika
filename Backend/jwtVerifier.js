const jwt = require('jsonwebtoken');

const jwtVerifier = function(req, res, next)
{
    // check header or url parameters or post parameters for token
	let token = req.body.token || req.query.token || req.headers['x-access-token'];

	// if there is no token
    if (!token)
    {
		return res.status(401).send({ error: 'No token provided.' });
	}

	// decode token, verifies secret and checks exp
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, decoded)
    {			
        if (err)
        {
			return res.status(403).send({ error: 'Invalid token.' });
        } 
        else
        {
			req.loggedUser = decoded;

			// If user is not admin and is modifying the site's content, stop them.
			if (decoded.is_admin == false)
			{
				let urlSections = String(req.url).split("/");

				if ( !(
					urlSections.includes("update") ||
					urlSections.includes("followed") ||
					urlSections.includes("favourite")
				) )
				{ return res.status(403).send({ error: 'User is not admin.' }); }
			}

			next();
		}
	});
};

module.exports = jwtVerifier;