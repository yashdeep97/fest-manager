var express = require('express');
var router = express.Router();
var passport = require('passport');
var authenticate = require('../utils/authentication').middleware;
/* GET home page. */
router.get('/?*', function (req, res, next) {
	var params = {
		title: 'Home',
		user: req.user,
		route: req.url,
		navigation: {
			home: {
				label: "Home",
				route: "/",
			},
			about: {
				label: "About",
				route: "/about",
			},
			events: {
				label: "Events",
				route: "/events",
			},
			dashboard: {
				label: "Dashboard",
				route: "/dashboard",
				initial: "disabled",
				require: {
					path: "user/isAuthenticated",
					for: "visible"
				},
			},
			ca: {
				label: "Campus Ambassador",
				route: "/ca",
			},
			portals: {
				route: "/portals",
				initial: "disabled",
				require: {
					path: "user/isElevated",
					for: "visible"
				},
				label: "Portals"
			}
		}
	};

	Object.keys(params.navigation).forEach(function (key) {
		params.navigation[key].triggers = 'sidebar/menu/' + key + '=active ';
		if (params.navigation[key].require) {
			params.navigation[key].triggers += params.navigation[key].require.path + "=" + params.navigation[key].require.for;
		}
	});

	res.render('index', params);
});


module.exports = router;
