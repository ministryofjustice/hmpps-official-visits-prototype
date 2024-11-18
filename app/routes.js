const express = require('express')
const router = express.Router()


//CREATE
require('./routes/create/routes-v1')(router);
require('./routes/create/routes-v2')(router);
require('./routes/create/routes-v3')(router);
require('./routes/create/routes-v4')(router);
require('./routes/create/routes-v5')(router);
require('./routes/create/routes-v6')(router);
require('./routes/create/routes-v7')(router);
require('./routes/create/routes-v8')(router);
require('./routes/create/routes-v9')(router);
require('./routes/create/routes-v10')(router);
require('./routes/create/routes-v11')(router);


//UNLOCK
router.use(/\/unlock\/version-([0-9]+)/, (req, res, next) => {
	req.version = req.originalUrl.split('/')[2]
	require(`./views/unlock/version-${req.params[0]}/routes`)(req, res, next);
})
router.use(/\/unlock\/experimental/, (req, res, next) => {
	req.version = req.originalUrl.split('/')[2]
	require(`./views/unlock/experimental/routes`)(req, res, next);
})


//CREATE (DAN)
router.use(/\/create\/version-([0-9]+)/, (req, res, next) => {
	req.version = req.originalUrl.split('/')[2]
	require(`./views/create/version-${req.params[0]}/routes`)(req, res, next);
})
router.use(/\/create\/experimental/, (req, res, next) => {
	req.version = req.originalUrl.split('/')[2]
	require(`./views/create/experimental/routes`)(req, res, next);
})


//APPOINTMENTS
router.use(/\/appointments\/version-([0-9]+)/, (req, res, next) => {
	req.version = req.originalUrl.split('/')[2]
	require(`./views/appointments/version-${req.params[0]}/routes`)(req, res, next);
})
router.use(/\/appointments\/tickets-for-dev\/designs/, (req, res, next) => {
	req.version = req.originalUrl.split('/')[2]
	require(`./views/appointments/tickets-for-dev/designs/routes`)(req, res, next);
})



router.post(`/add-people-route`, function (req, res) {
	const peopleRoute = req.session.data['add-people-method'];
	if (peopleRoute === 'upload-file') {
		res.redirect(`create-appointment/upload-file-info`);
	} else {
		res.redirect(`create-appointment/search-person`);
	}
  });


  router.post(`/FRD-route`, function (req, res) {
	const peopleRoute = req.session.data['FRD-tier'];
	if (peopleRoute === 'Tier 2') {
		res.redirect(`v1/create-appointment/provider`);
	} else {
		res.redirect(`v1/create-appointment/location`);
	}
  });


  router.post(`/FRD-route`, function (req, res) {
	  const peopleRoute = req.session.data['FRD-tier'];
	  if (peopleRoute === 'Tier 2') {
		  res.redirect(`v1/create-appointment/provider`);
	  } else {
		  res.redirect(`v1/create-appointment/location`);
	  }
	});


	router.post(`/appointment-repeat-question`, function (req, res) {
		const appRepeat = req.session.data['appointment-repeat'];
		if (appRepeat === 'Yes') {
			res.redirect(`v1/create-appointment/appointment-frequency`);
		} else {
			res.redirect(`v1/create-appointment/clashes`);
		}
	  });






module.exports = router
